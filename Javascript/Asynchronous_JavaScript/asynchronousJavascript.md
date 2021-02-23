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

## 2. Promises

## 3. `async` and `await`

## 4. Asynchronous Iteration
    



