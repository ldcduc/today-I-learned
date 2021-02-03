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
    grep -v “$cdcatnum” $tracks_file > $temp_file
    cat $temp_file > $tracks_file 
    echo
    add_record_tracks
}
```

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

## Commands

### `break`

### The `:` command

### `continue`

### The `.` command

### `echo`

### `eval`

### exec

### `exit n`

### `export`

### `expr`

### `printf`

### `return`

### `set`

### `shift`

### `trap`

### `unset`

### Two useful commands with Regex

#### The `find` command

#### The `grep` command

## Command Execution

### Arithmetic Expansion

### Parameter Expansion

## Here Documents

## Debugging Script