* Join telegram channel [t.me/burpsuite](https://t.me/burpsuite) for burp download  
* Install burp on my macbook/hackintosh
    1. Install required java
    2. Install burp

### 1. Install java

Using homebrew  

```bash
brew tap adoptopenjdk/openjdk
brew install --cask adoptopenjdk13
```

&rarr; substitute `13` for the approriate version `approriate8`, `approriate11`  

### 2. Install burp

cd in to the downloaded burp directory and run (as well as reading README.txt)  

```bash
java --illegal-access=permit -Dfile.encoding=utf-8 -javaagent:BurpSuiteLoader_v2020.11.2.jar -noverify -jar burpsuite_pro_v2020.11.2.jar
```
