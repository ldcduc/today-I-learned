* [Book-to-buy](https://pragprog.com/titles/dnvim2/practical-vim-second-edition/)
* [Amazon](https://www.amazon.com/Practical-Vim-Thought-Pragmatic-Programmers/dp/1934356980)

> My brief note on the book _Practical Vim - Edit Text at the Speed of Thought_  
> I've read this book in 2016 for the first time. Now, it's chance to review myself in 2021.

# The Vim Way

### Tip 1 - Meet the Dot-command

* The Dot-command is a Micro Macro

### Tip 2 - Don't repeat yourself

### Tip 3 - Take one step back, thne three forward

### Tip 4 - Act, Repeat, Reverse

### Tip 5 - Find and replace by hand

### Tip 6 - Meet the Dot formula

# Part I - Modes

## Normal Mode

### Tip 7 - Pause with your brush off the page

### Tip 8 - Chunk your undos

### Tip 9 - Compose repeatable changes

### Tip 10 - Use counts to do simple arithmetic

`<C-a>` = perform addition on numbers  
`<C-x>` = perform subtraction on numbers  
Note: `<C-a>` _command will “add [count] to the number **at** or **after** the cursor_

#### Number formats

* As is the convention in some programming languages, Vim interprets numerals with a leading zero to be in octal notation rather than in decimal. 
* Add `set nrformats=` &rarr; cause Vim to treat all numerals as decimal

### Tip 11 - Don't count if you can repeat

`d2w` = delete two words  
`2dw` = delete a word - two times  
`dw.` = delete a word + repeat

&rarr; Use `dw` and if you counted wrong &rarr; undo or repeat

### Tip 12 - Combine and Conquer

#### Operator + Motion = Action

Vim's Operator Commands  

| Trigger | Effect | 
|---|---|
| c | Change |
| d | Delete | 
| y | Yank into register |
| g~ | Swap case |
| gu | Make lowercase | 
| gU | Make uppercase |
| > | Shift right | 
| < | Shift left |
| = | Autoindent |
| ! | Filter {motion} lines through an external program |

You can program your **customer operators** or **custom motions**  
Custom Operators Work with Existing Motions  
Custom Motions Work with Existing Operators  

Note: be aware of **Operator-Pending Mode**  

## Insert Mode

### Tip 13 - Make corrections instantly from Insert Mode

`<C-h>` = Delete back on character  
`<C-w>` = Delete back on word  
`<C-u>` = Delete back to start of line  

### Tip 14 - Get back to Normal Mode

`<Esc>` = Switch to Normal Mode  
`<C-[>` = Switch to Normal Mode  
`<C-o>` = Switch to Insert Normal Mode  

### Tip 15 - Paste from a register without leaving insert mode

`<C-r>0`  
`<C-r>{register}` = paste from register in insert mode
`<C-r><C-p>{register}` = Insert text literraly and fiexes any unintended indentation  

### Tip 16 - Do back-of-the-envelope calculations in place

`<C-r>=` + calculation + `<CR>`  

### Tip 17 - Insert unusual characters by character code

`<C-v>{code}`         = Insert character by decimal code
`<C-v>u{code}`        = Insert character by hexadecimal code
`<C-v>{nondigit}`     = Insert nondigit literally
`<C-k>{char1}{char2}` = Insert character represented by `{char1}{char2}` digraph  

### Tip 18 - Insert unsual characters by digraph

### Tip 19 - Overwrite existing text with replace mode

#### Over Tab characters with Virtual Replace Mode  

`gR`  
`r{char}`  
`gr{char}`  

## Visual Mode

### Tip 20 - Grok Visual Mode

#### Meet Select Mode

**Select mode** = resembles the selection mode in Microsoft Windows  

`<C-g>` = Toggle between Visual mode and Select mode  

### Tip 21 - Defien a Visual selection

`v`     = Enable character-wise Visual mode  
`V`     = Enable line-wise Visual mode  
`<C-v>` = Enable block-wise Visual mode  
`gv     = Reselect the last visual selection  

Note: the `gv` command should do the right thing, the only case where it might get confused &rarr; _the last selection has been deleted_.

#### Switching between Visual modes

| Command | Effect |
|---|---|
| `<Esc>`/`<C-[>` | Switch to Normal mode |
| `v`/`V`/`<C-v>` | Switch to Normal mode (when used from character-, line- or block-wise Visual mode, respectively) |
| `v` | Switch to character-wise Visual mode |
| `V` | Switch to line-wise Visual mode |
| `<C-v>` | Switch to block-wise Visual mode |
| `o` | Go to other end of highlighted text |

### Tip 22 - Repeat line-wise visual commands

### Tip 23 - Prefer operators to visual commands where possible

`vitU` vs `gUit`?  
`gU{it}` (1 action) is more friendly to dot command  
`vitU` {2 actions = selection + make uppercase}  

### Tip 24 - Edit tabular data with visual-block mode

### Tip 25 - Change columns of text

### Tip 26 - Append after a ragged visual block

## Command-Line Mode

### Meet Vim's command line

| Command | Effect |
|---|---|
| `:[range]delete [x]` | Delete specified lines [into register x] |
| `:[range]yank [x]` | Yank specified lines [into register x] |
| `:[line]put [x]` | Put the text from register x after the specified line |
| `:[range]copy {address}` | Copy the specified lines to below the line specified by {address} |
| `:[range]move {address}` | Move the specified lines to below the line specified by {address} |
| `:[range]join` | Join the specified lines |
| `:[range]normal {commands}` | Execute Normal mode {commands} on each speci- fied line |
| `:[range]substitute/{pattern}/{string}/[flags]` | Replace occurrences of {pattern} with {string} on each specified line |
| `:[range]global/{pattern}/[cmd]` | Execute the Ex command [cmd] on all specified lines where the {pattern} matches |

Some more Ex commands  
`:edit`  
`:write`  
`:tabnew`  
`:split`  
`:prev`/`:next`  
`:bprev`/`:bnext`  

**see** `:h ex-cmd-index` **for the full list**

#### Special Keys in Vim’s Command-Line Mode

`<C-w>`, `<C-u>` - delete a word/a line  
`<C-v>`, `<C-k>` - insert characters that are not found on the keyboard  
`<C-r>{register}` - insert the contents of register  

Note: in Vim command-line, we are limited in the range of motions, only `<left>` and `<right>` arrow keys  

#### Ex Commands Strike Far and Wide

It can sometimes be quicker to use an Ex command than to get the same job done with Vim’s Normal commands. For example, Normal commands tend to act on the current character or the current line, whereas an Ex command can be executed anywhere. This means that we can use Ex commands to make changes without having to move our cursor. But the greatest feature that distinguishes Ex commands is their ability to be executed across many lines at the same time.  

### Tip 28 - Execute a command one or more consecutive lines

#### Use line numbers as an address

`:1`           = Move to line 1  
`:$`           = Move to the last line  
`:print`, `:p` = Show content of the current line (in bottom tab)  
`:3p`  

#### Specify a range of lines by address

`{start},{end}`, `:2,5p`  
`:.,$p`  
`:.`           = Address of current line

#### Specify a Range of Lines by Visual Selection

`:'<,'>p`  

#### Specify a Range of Lines by Patterns

`:/<html>/,/<\/html>/p`  
`:/{pattern-1}/,/{pattern-2}/p`  

#### Modify an Address Using an Offset

`:/<html>/+1,/<\/html>/-1p`  
`:{address}+n`  
`:.,.+3p`  

#### Summary

| Symbol | Address |
|---|---|
| 1  | First line of the file |
| $  | Last line of the file |
| 0  | Virtual line above first line of the file |
| .  | Line where the cursor is placed |
| 'm | Line containing mark m |
| '< | Start of visual selection |
| '> | End of visual selection |
| %  | The entire file (shorthand for :1,$) |

### Tip 29 - Duplicate or move lines using `:t` and `:m` commands

The `:copy`, `:t` command = dupplicate one or more lines from one part to another part of the document  
`:[range]copy{address}`

| Command | Effect |
|---|---|
| `:7.`      | Copy line 7 to just below the current line |
| `t7`       | Copy the current line to just below line 7 | 
| `:t.`      | Duplicate the current line (similar to Normal mode `yyp` |
| `:t0`      | Copy the current line to the begin of the file |
| `:t$`      | Copy the current line to the end of the file |
| `:'<,'>t0` | Copy the visually selected lines to the start of the file |

#### Move Lines with the `:m` command

`:[range]move {address}`, `:m`  

Note: Repeat the last Ex command `@:` &rarr; `{count}@:`  

## Part II - Files

## Part III - Getting Around Faster

## Part IV - Registers

## Part V - Patterns

## Part VI - Tools
