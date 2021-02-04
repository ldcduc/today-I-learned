$ `ls -al | more`  

$ `man bash | col -b`  

# Pipes and Redirection

## Redirecting output

$ `kill -HUP 1234 >killout.txt 2>killer.txt`  

Use `>&` to combine two outputs  
$ `kill -1 1234 >killouterr.txt 2>&1`  

Notice the order of the operators. This reads as "redirect standard output to the file killouterr.txt, and then direct standard error to the same place as the standard output." If you get the order wrong, the redirect won’t work as you expect.  

$ `$ kill -1 1234 >/dev/null 2>&1`  

Use the Linux universal "bit bucket" of /dev/null to efficiently discard the entire output

## Redirecting input

## Pipes

Unlike in MS-DOS, processes connected by pipes can run simultaneously and are automatically rescheduled as data flows between them

```bash
ps > psout.txt
sort psout.txt > pssort.out
```

With pipes  

```bash
ps | sort > pssort.out 
```

&rarr; want to see output paginated on the screen  

`ps | sort | more`  

More example: all the different process names that are running excluding shells. You could use

`ps –xo comm | sort | uniq | grep -v sh | more`

The output file is created or written to immediately when the set of commands is created, so never use the same file- name twice in a string of commands  
$ `cat mydata.txt | sort | uniq > mydata.txt` &rarr; empty file

# The Shell as a Programming Language

## Creating a Script

```bash
#! /bin/sh

# first
# This file looks through all the files in the current
# directory for the string POSIX, and then prints the name of
# those files to the standard output

for file in *
do
    if grep -q POSIX $file
    then 
        echo $file
    fi
done

exit 0
```

* `#` comment
* `#!` program to be used to execute this file &rarr; `/bin/sh` is the default shell program

## Make a Script Executable

$ `/bin/sh first_script`  

or  

$ `chmod +x first`  
$ `first`

&rarr; Comamnd wasn't found &rarr; set PATH

$ `PATH=$PATH:.`  

or alternatively use `./first`

> You shouldn’t change the PATH variable like this for the superuser, conventionally the user name root. It’s a security loophole, because the system administrator logged in as root can be tricked into invoking a fake version of a standard command. One of the authors admits to doing this once — just to prove a point to the system administrator about security, of course! It’s only a slight risk on ordinary accounts to include the current directory in the path, so if you are particularly concerned, just get into the habit of prepending ./ to all commands that are in the local directory.

```bash
# cp first /usr/local/bin
# chown root /usr/local/bin/first 
# chgrp root /usr/local/bin/first 
# chmod 755 /usr/local/bin/first
```

Form of the `chmod` command  

* In Linux you can delete a file if you have **write** permission on the directory that contains it.

# Shell Syntax

* Variables
* Conditions
* Program control
* Lists
* Functions
* Commands built into the shell
* Getting the result of a command

## Variables

* Don't usually declare variables in the shell before using them &rarr; create them by using them
* By default, all varibles are considered + stored as _string_
* Shell + utilities convert numeric strings to their values to operate on demand
* String contains space &rarr; deliminate by quote marks

```bash
#! /bin/sh

myvar="Hi there"

echo $myvar
echo "$myvar"
echo '$myvar'
echo \$myvar

echo Enter some text
read myvar

echo '$myvar' now equals $myvar
exit 0
```

> Run `sh variable.sh`

* Single quote mark &rarr; `$myvar$`
* Double quote mark &rarr; `Hi there`

### Environment Variables

| Environment Variable | Description |
|---|---|
| $HOME | Home directory of current user | 
| $PATH | Colon-separated list of directories to search for commands
| $PS1 | A command prompt, frequently $, but in bash you can use some morecomplexvalues;forexample,thestring[\u@\h \W]$isa popular default that tells you the user, machine name, and current directory, as well as providing a $ prompt.
| $PS2 | A secondary prompt, used when prompting for additional input; usally > |
| $IFS | An input field separator. This is a list of characters that are used to separate words when the shell is reading input, usually space, tab, and newline characters. |
| $0 | The name of shell script |
| $# | Number of parameters passed |
| $$ | Process ID of shell script &rarr; often use in script for generating unique temporary filenames |

### Parameter Variables

| Parameter Variable | Description |
|---|---|
| $1, $2, ... | The parameters given to the script |
| $\* | A list of all parameters, in a single variable, separated by the first character in the environment variable `IFS`. If `IFS` is modified, then theway `$*` separates the command line into parameters will change. |
| $@ | A subtle variation on `$*`; it doesn't use the `IFS` environment variable, so parameters are not run together even if `IFS` is empty |

Try them out

```bash
IFS=''
set foo bar bam
echo "$@"
echo "$*"
unset IFS
echo "$*"
```

In general, if you want access to the parameters, $@ is the sensible choice.  

```bash
#! /bin/sh

salutation="Hello"
echo $salutation
echo "The program $0 is now running"
echo "The second parameter was $2"
echo "The first parameter was $1"
echo "The parameter list was $*"
echo "The user’s home directory is $HOME"
echo "Please enter a new greeting"
read salutation
echo $salutation
echo "The script is now complete" exit 0
# sh ./try_var foo bar baz
```

> Run `sh try_var.sh foo bar baz`

---

## Conditions

## Control Structures

### if

Syntax:  

```bash
if condition
then
    statements
else
    statements
fi
```

Try `sh if.sh`  

### elif

Script `elif.sh`:  

```bash
#!/bin/sh

echo "Is it morning? Please answer yes or no"
read timeofday

if [ $timeofday = "yes" ]
then
    echo "Good morning"
elif [ $timeofday = "no" ]; 
then
    echo "Good afternoon"
else
    echo "Sorry, $timeofday not recognized. Enter yes or no"
    exit 1
fi

exit 0
```

Try `sh elif.sh`  

### for

Syntax  

```bash
for variable in values
do
    statements
done
```

Script `for.sh`:  

```bash
#! /bin/sh

for foo in bar fud 43
do
    echo $foo
done
exit 0
```

Run `sh for`  
Try substite `bar fud 43` to `"bar fud 43"`  

Using for loop with Wildcard expansion  

Script `for2.sh`:  

```bash
#!/bin/sh

for file in $(ls f*.sh); do
    lpr $file
done
exit 0
```

&rarr; This illustates `$(command)` syntax  

### while

Syntax:  

```bash
while condition do
    statements
done
```

Script `while.sh` (poor password-checking program):  

```bash
#!/bin/sh

echo "Enter password"
read trythis

while [ "$trythis" != "secret" ]; do
    echo "Sorry, try again"
    read trythis
done
echo "Correct password"

exit 0
```

### until

Syntax:  

```bash
until conditiion
do
    statements
done
```

Script `until.sh`  

```bash
#!/bin/bash

until who | grep "$1" > /dev/null
do
    sleep 60
done

# now ring the bell and announce the expected user

echo -e '\a'
echo "**** $1 has just logged in ****"

exit 0
```

### case

Syntax:  

```bash
case variable in
    pattern [ | pattern ] ...) statements;;
    pattern [ | pattern ] ...) statements;;
esac
```

* Match the content of variables against patterns
* Notice that each pattern line is terminated with double semicolons (;;) &rarr; put multiple statements between each pattern

> Be careful with the case construct if you are using wildcards such as '\*' in the pattern. The problem is that the first matching pattern will be taken, even if a later pattern matches more exactly.

&rarr; **Not the best match** &rarr; **The first match**  

---

## Lists

Example code:  

```bash
if [ -f this_file ]; 
then
    if [ -f that_file ]; 
    then
        if [ -f the_other_file ]; 
        then
            echo "All files present, and correct"
        fi
    fi
fi
```

Another example:  

```bash
if [ -f this_file ]; 
then 
    foo="True"
elif [ -f that_file ]; 
then 
    foo="True"
elif [ -f the_other_file ]; 
then 
    foo="True"
else foo="False"
fi
if [ "$foo" = "True" ]; 
then
    echo "One of the files exists" 
fi
```

**We have alternative way**  

### AND list

`statement1 && statement2 && statement3 && ...`  

Try out `and_list.sh`

```bash
#!/bin/sh
touch file_one 
rm -f file_two
if [ -f file_one ] && echo "hello" && [ -f file_two ] && echo " there" then
    echo "in if" 
else
    echo "in else" 
fi
exit 0
```

### OR list

`statement1 || statement2 || statement3 || ...`  

Try `or_list.sh`  

```bash
#!/bin/sh

rm -f file_one

if [ -f file_one ] || echo "hello" || echo " there"
then
    echo "in if"
else
    echo "in else"
fi

exit 0
```

**Consider this**:  

`[ -f file_one ] && command for true || command for false`

&rarr; This will execute the first command if the test succeeds and the second command otherwise. It’s always best to experiment with these more unusual lists, and in general you should use braces to force the order of evaluation.

### Statement blocks

Put multiple statements into `{ }` to make a statement block  

```bash
get_confirm && {
    grep -v "$cdcatnum" $tracks_file > $temp_file
    cat $temp_file > $tracks_file 
    echo
    add_record_tracks
}
```

---

## Functions

Syntax:  

```bash
function_name () { 
    statements
}
```

### Returning value

```bash
foo () { echo JAY;} 
...
result="$(foo)"
```

`my_name.sh`:  
```bash
#!/bin/sh

yes_or_no() {
    echo "Is your name $* ?" 
    while true
    do
        echo -n "Enter yes or no: " 
        read x
        case "$x" in
            y | yes ) return 0;;
            n | no) return 1;;
            * ) echo "Answer yes or no"
        esac 
    done
}

echo "Original parameters are $*"

if yes_or_no "$1"
then
    echo "Hi $1, nice name"
else
    echo "Never mind"
fi

exit 0
```

Try `sh my_name.sh Your name`  

#### Declare global variable with `local` keyword

* Scope in the function only
* Within the function, local variable overlays global variable with the same name

Try `local_variable.sh`:  

```bash
#!/bin/sh
sample_text="global variable"

foo() {
    local sample_text="local variable"
    echo "Function foo is executing"
    echo $sample_text
}

echo "script starting"
echo $sample_text

foo

echo "script ended"
echo $sample_text

exit 0
```

---

## Commands

### `break`

* Escape from enclosing `for`, `while`, `until` loop
* Add numeric parameter &rarr; the number of loops to break out &rarr; code will be hard to read (not recommended)

```bash
#!/bin/sh
rm -rf fred* 
echo > fred1 
echo > fred2 
mkdir fred3 
echo > fred4
for file in fred* 
do
    if [ -d "$file" ]; then 
        break;
    fi 
done
echo first directory starting fred was $file

rm -rf fred* 
exit 0
```

`break` with numeric parameter:  

```bash
for i in {1..3}; do
    for j in {1..3}; do
        if [[ $j -eq 2 ]]; then
        break 2
        fi
        echo "j: $j"
    done
    echo "i: $i"
done

echo "All Done!"
```

### The `:` command

* a **null command** 
    * alias for `true` (`:` is built-in &rarr; faster than `true`)
* useful in conditional setting of variables
    * `: ${var:=value}`

Examples:  

```bash
#!/bin/sh

rm -f fred
if [ -f fred ]; then
    :
else 
    echo file fred did not exist
fi

exit 0
```

### `continue`

Example:  

```bash
#!/bin/sh
rm -rf fred*
echo > fred1
echo > fred2
mkdir fred3
echo > fred4

for file in fred* 
do
    if [ -d “$file” ]; then
            echo “skipping directory $file”
        continue 
    fi
    echo file is $file 
done

rm -rf fred* 
exit 0
```

### The `.` command

The dot (.) command executes the command in the current shell:  

`. ./shell_script`  

* Allow the executed script to change the current environment

Try out `classic_set`:  

`latest_set`:  

```bash
#!/bin/sh

version=classic
PATH=/usr/local/old_bin:/usr/bin:/bin:.
PS1="classic> "
```

```bash
#!/bin/sh

version=latest
PATH=/usr/local/new_bin:/usr/bin:/bin:.
PS1=" latest version> "
```

Explain: The scripts are executed using the dot command &rarr; each script is executed in the current shell. This enables the script to **change environment settings** in the current shell, which **remains changed** even when the script finishes executing.

### `echo`

How to suppress the new line characters:  

* Common method: `echo -n "string to output"`  
* Second option: `echo -e "string to output\c"`
    * `\c`: supress new line character
    * `\t`: outputting a tab
    * `\n`: outputting carriage returns

### `eval`

* Evaluate arguments

```bash
foo=10
x=foo
y='$'$x
echo $y
```

&rarr; output `$foo`  

```bash
foo=10
x=foo
eval y='$'$x
echo $y
```

&rarr; output `10`

* `eval` is a bit like an extra `$`
* useful &rarr; enabling code to be generated and run on-the-fly

### exec

Two different uses:  

* Replace current shell with different program:
    * `exec wall "Thanks for all the fish"`
* Modify current file descriptors:
    * `exec 3< afile`

### `exit n`

* Cause the script to exit with exit code `n`
* Use at _command prompt_ or _interactive shell_ &rarr; log you out
* No exit status &rarr; the status of the last command executed in the script is used as return value
* **Good to practice to supply an exit code**  

In shell script programming, exit code `0` = success, code `1` through `125` inclusive can be used by scripts.  
The remaining values have reserved meanings:  

| Exit code | Description |
|---|---|
| 126 | The file was not executable |
| 127 | A command was not found |
| 128 and above | A signal occurred |

&rarr; Enable programmer to use 125 user-defined error codes without the need for a global error code variable

Example:  

```bash
#!/bin/sh

if [ -f .profile ]; then
    exit 0
fi

exit 1
```

&rarr; hardcore style:  

`[ -f .profile ] && exit 0 || exit 1`  

### `export`

* Makes the variable named as its parameter available in subshells.
    * By default, variables created in a shell are not available in further (sub)shells invoked from that shell. 
    * The `export` command creates an environment variable from its parameter that can be seen by other scripts and pro- grams invoked from the current program.
* More technically, the exported variables form the environment variables in any child processes derived from the shell. 
    * This is best illustrated with an example of two scripts, export1 and export2.

`export2`:  

```bash
#!/bin/sh

echo "$foo"
echo "$bar"
```

`export1`:  

```bash
#!/bin/sh

foo="The first meta-syntactic variable"
export bar="The second meta-syntactic variable"

export2
```

Try `./export1` (run `sudo chmod +x export1 export2` before)  

```
$ ./export1

The second meta-syntactic variable
$
```

* The commands `set -a` or `set -allexport` will export all variables thereafter  

### `expr`

Apply:  

* ``x=`expr $x + 1` ``
* ``x=$(expr $x + 1)``

| Expression Evaluation | Description | 
|---|---|
| `expr1 | expr2` | expr1 if expr1 is nonzero, otherwise expr2 | 
| `expr1 & expr2` | Zero if either expression is zero, otherwise expr1 | 
| `expr1 = expr2` | Equal | 
| `expr1 > expr2` | Greater than | 
| `expr1 >= expr2` | Greater than or equal to | 
| `expr1 < expr2` | Less than | 
| `expr1 <= expr2` | Less than or equal to | 
| `expr1 != expr2` | Not equal | 
| `expr1 + expr2` | Addition | 
| `expr1 - expr2` | Subtraction | 
| `expr1 * expr2` | Multiplication | 
| `expr1 / expr2` | Integer division | 
| `expr1 % expr2` | Integer modulo | 

* In newer scripts, the use of `expr` is normally replaced with the more efficient `$((...))` syntax, which is covered later in the chapter.

&nbsp;  

### `printf`

Syntax:  

`printf "format string" parameter1 parameter2 ...`  

* All characters in the format string other than `%` and `\` appear literally in the output
* The following escape sequences are supported

| Escape Sequence | Description |
|---|---|
| `\"` | Double quote
| `\\` | Backslash character
| `\a` | Alert (ring the bell or beep)
| `\b` | Backspace character
| `\c` | Suppress further output
| `\f` | Form feed character
| `\n` | Newline character
| `\r` | Carriage return
| `\t` | Tab character
| `\v` | Vertical tab character
| `\ooo` | The single character with octal value ooo
| `\xHH` | The single character with the hexadecimal value HH

The principal conversions are shown in the following table:  

| Conversion Specifier | Description |
|---|---|
| `D` | Output a decimal number | 
| `C` | Output a character | 
| `S` | Output a string | 
| `%` | Output the `%` character | 

```bash
$ printf "%s\n" hello
hello
$ printf "%s %d\t%s" "Hi there" 15 people
Hi There 15    people
```

&rarr; must use `" "` to protect `Hi There` string and make it a single parameter  

&nbsp;

### `return`

* Causes functions to return
* Takes a single numeric parameter
    * No parameter specified &rarr; `return` defaults to the exit code of the last command

### `set`

* Sets the parameter variables for the shell

`set.sh`:  

```bash
#!/bin/sh

echo the date is $(date)
set $(date)
echo The month is $3

exit 0
```

Output:  

```
the date is Thu 04 Feb 2021 12:09:17 PM UTC
The month is Feb
```

* This program sets the parameter list to the `date` command's output &rarr; can use positional parameter `$3` to get at the month
* Control the way the shell executes by passing it parameters: `set -x` &rarr; make script display a trace of its currently executing command

### `shift`

* Moves all the parameter variables down by one: `$2` becomes `$1`, `$3` becomes `$2`, and so on; the value of `$1` is **discarded**, `$0` **remains unchanged
* &rarr; Useful for scanning through all parameters passed into a script

`shift.sh`:  

```bash
#!/bin/sh

while [ "$1" != "" ]; do
    echo "$1"
    shift
done

exit 0
```

Try `bash shift.sh`  

### `trap`

> For those not familiar with signals, they are events sent asynchronously to a pro- gram. By default, they normally cause the program to terminate.

`trap command signal`

### `unset`

* The unset command removes variables or functions from the environment. 
* It can’t do this to read-only variables defined by the shell itself, such as IFS.

```bash
#!/bin/sh

foo="Hello World" 
echo $foo

unset foo 
echo $foo
```

**=** vs. **unset**  

* `foo=` &rarr; set `foo` to `null`, `foo` still exists
* `unset foo`: remove the variable `foo` from the environment

### Two useful commands with Regex

#### The `find` command

#### The `grep` command

---

## Command Execution

### Arithmetic Expansion

### Parameter Expansion

---

## Here Documents

---

## Debugging Script
