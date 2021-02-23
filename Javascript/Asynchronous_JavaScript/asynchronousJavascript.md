# Asynchronous JavaScript

* JavaScript programs in a web browser are typically _event-driven_ 
    * wait for the user to click or tap before they actually anything.
    * JavaScript-based servers typical wait for clien requests to arrive

## 1. Asynchronous Programming with Callbacks

### Timers

```javascript
setTimeout(checkForUpdates, 60000);
```

&rarr; `checkForUpdates()` will be call 60,000 milliseconds (1 minute) after the `setTimeout()` call`

```javascript
// Call checkForUpdates in one minute and then again every minute after that
let updateIntervalId = setInterval(checkForUpdates, 60000);

// setInterval() returns a value that we can use to stop the repeated 
// invocations by calling clearInterval(). (Similarly, setTimeout() 
// returns a value that you can pass to clearTimeout())
function stopCheckingForUpdates() {
    clearInterval(updateIntervalId);
}
```

### Events

* Client-side JavaScript &rarr; event driven

```javascript
// Ask the web browser to return an object representing the HTML
// <button> element that matches this CSS selector
let okay = document.querySelector('#confirmUpdateDialog button.okay');
// Now register a callback function to be invoked when the user // clicks on that button.
okay.addEventListener('click', applyUpdate);
```

### Network Events

```javascript
function getCurrentVersionNumber(versionCallback) { // Note callback argument 
    // Make a scripted HTTP request to a backend version API
    let request = new XMLHttpRequest();
    request.open("GET", "http://www.example.com/api/version"); 
    request.send();
   
    // Register a callback that will be invoked when the response arrives
    request.onload = function() {
        if (request.status === 200) {
            // If HTTP status is good, get version number and call callback.
            let currentVersion = parseFloat(request.responseText); 
            versionCallback(null, currentVersion);
        } else {
            // Otherwise report an error to the callback 
            versionCallback(response.statusText, null);
        }
    };
    // Register another callback that will be invoked for network errors
    request.onerror = request.ontimeout = function(e) { 
        versionCallback(e.type, null);
    };
}
```

### Callbacks and Events in Node

Example asynchronous API for reading contents of a file:  

```javascript
const fs = require("fs"); // The "fs" module has filesystem-related APIs 
let options = {           // An object to hold options for our program
    // default options would go here
};

// Read a configuration file, then call the callback function
fs.readFile("config.json", "utf-8", (err, text) => { 
    if (err) {
        // If there was an error, display a warning, but continue
        console.warn("Could not read config file:", err); 
    } else {
        // Otherwise, parse the file contents and assign to the options object
        Object.assign(options, JSON.parse(text)); 
    }

    // In either case, we can now start running the program
    startProgram(options);
});
```


## 2. Promises

Core language feature designed to simplify asynchronous programming  

* A `Promise`: object that represents the result of an asynchronous computation  
* That result may or may not be ready yet, and the Promise API is intentionally vague about this:  
    * there is no way to synchronously get the value of a Promise
    * you can only ask the Promise to call a callback function when the value is ready

## 3. `async` and `await`

## 4. Asynchronous Iteration
    



