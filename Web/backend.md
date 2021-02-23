| | |
|---|---|
| Client-server| - separating user interface concerns vs. data storage concerns |
| Stateless | - Each request must contain all information <br> - Not take advantage of stored context on server 
| Cacheable | 
| Uniform interface | 
| Layered system |
| Code on demand |

Anatomy:  

* Endpoint
    * Path &rarr; Determine which resource
* Method
* Headers
* Data (body)


| Http request | |
|---|---|
| **Information responses** | |
| 100 Continue |
| 101 Switching protocol |
| 102 Processing |
| 103 Early hints | 
| **Successful responses** | |
| 200 Ok |
| 201 Created |
| 202 Accepted |
| 203 Non-Authoritative Information |
| 204 No Content
| 205 Reset Content
| 206 Partial Content
| 207 Multi-status (Web DAV) |
| 208 Already Reported (Web DAV) |
| 226 IM Used (HTTP Delta encoding) |
| **Redirection messages**
| 300 Multiple Choice |
| 301 Moved Permanently |
| 302 Found |
| 303 See Other |
| 304 Not Modified |
| 305 Use Proxy |
| 306 unused |
| 307 Temporary Redirect |
| 308 Permanent Redirect |
| **Client error responses** |
| 400 Bad Request |
| 401 Unauthorized |
| 402 Payment Required |
| 403 Fobidden |
| 404 Not Found |
| 405 Method Not Allowed |
| 406 Not Acceptable |
| 407 Proxy Authentication Required |
| 408 Request Timeout |
| 409 Conflict |
| 410 Gone |
| 411 Length Required |
| 412 Precondition Failed |
| 413 Payload Too Large |
| 414 URI Too Long |
| 415 Unsupported Media Type |
| 416 Range Not Satisfiable |
| | 
| Server error responses |
|

* 1xx - Information response
* 2xx - Successful response
    * 200 OK
        * `GET` - resource fetched, is transmitted in the message body
        * `HEAD` - entity headers are in message body
        * `PUT` or `POST` - resource describing the result of the action &rarr; is transmitted in the message body
        * `TRACE` - message body contains the request message as received by the server
    * 201 Created
    * 202 Accepted
* 3xx - Redirection messages
    * 300 Multiple Choice: request has more than one possible response
    * 301 Moved Permanently: the new URL is given in the response
    * 302 Found: the URI of requested resource has been changed _temporarily_
    * 303 See Other: the server sent this response to direct the client &rarr; to get the requested resource at another URI with a GET request
    * 304 Not Modified: for caching purpose; response has not been modified &rarr; can continue to use the same cached version of the response
* 4xx - Client error responses
    * 400 Bad Request
    * 401 Unauthorized
    * 403 Forbidden
    * 404 Not Found
    * 405 Method Not Allowed
    * 406 Not Acceptable
    * 407 Proxy Authentication Required &rarr; similar to 401 but authentication is needed to be done by a proxy
    * 408 Request Timeout
    * 409 Conflict &rarr; when a request conflicts with the current state of the server
* 5xx - Server error responses
    * 500 Internal Server Error
    * 501 Not Implemented
    * 502 Bad Gateway: the server, while working as a gateway to get a response needed to handle the request, got an invalid response
    * 503 Service Unavailable
    * 504 Gateway Timeout: when the server is acting as a gateway and cannot get a response in time
    * 511 Network Authentication Required: the client needs to authenticate to gain network access.
HTTP request methods  

* `GET` - requests resource &rarr; should only retrieve data
* `HEAD` - ask for a response identical to that of `GET` request &rarr; but **without** the response body
* `POST` - submits an entity to specified resource &rarr; (often) cause a _change in state_ or _side effects_ on the server
* `PUT` - replaces all current representations (of target resource) with the request payload
* `DELETE` - deletes a specified resource
* `CONNECT` - establishes a tunnel to the server identified by the target resource
* `OPTION` - is used to describe the communication options for the target resource
* `TRACE` - performs a message loop-back test along the path to the target resource
* `PATCH` - is used to apply **partial** modification to a resource

