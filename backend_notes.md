> Thanks to my friend VietBlu

# Fundamental
- When mentioning any tech names and keywords, make sure to have a decent understanding of those concepts.
- What is it? How does it work? Why use it?
Example: "Last job, I developed web REST API with Java Spring" 
Question might be asked:
-> what is REST? difference between GET vs POST? -> what is/why HTTP? -> what is TCP?
-> what is Spring? adv vs disadv? what some of the design patterns does Spring use? -> answer "IoC/DI, MVC" -> what is IoC/DI? MVC? adv vs disadv of them?
- Expect to be asked at least 3 "branches/levels" deep on any concept.

- Read: https://github.com/donnemartin/system-design-primer
- Try: https://github.com/danistefanovic/build-your-own-x
- Watch: https://www.youtube.com/channel/UCRPMAqdtSgd0Ipeef7iFsKw

# Programming languagues
- Sometime people prefer if remeber syntax not just for coding but also for unit testing

## OOP:2 paths
- Popular: abstraction,encapsulation,inheritance,polymorphism
- Alan Kay confirmed: messaging, local retention and protection and hiding of state-process, and extreme late-binding of all things. can be done in Smalltalk and in LISP
## Functional:
- pure functions, immutable states, high-order function (function used like variables), closures

## Comparison
### Must know
compiled vs interpreted, manual memory management vs garbage collection, static typed vs dynamic typed
### Extra
just-in-time vs ahead-of-time compilation, optimization techniques in compiling/interpreting

## Design Patterns
- Singleton, Builder, Abstract Factory, Dependency Injection, Chain of Responsibility
- Flyweights, Strategy, Adapter

## Race condition handling
- When output depends on the order that threads executes
- Deadlocks
- How to avoid?

## Java
- Compiled to bytecode,interpreted by JVM which uses just-in-time compilation (compile some bytecode/source code to native code),
- Support OOP, garbage collection, multithread, multi platform
- synchronized (same principle as lock in begining, unlock at end function), locks, volatile (make sure changes made to this in 1 thread is reflected immediately in another thread. synchronized ensures both mutex(only 1 thread can execute) and visbility(changes reflected instantly in all threads) while volatile only ensures visbility.
- diff between string, string buffer, string builder

### Some example of using design patterns in Java
#### Creational patterns
+ Factory method
- java.util.Calendar#getInstance() & java.nio.charset.Charset#forName()
+ Prototype
- java.lang.Object#clone()
+ Singleton
- java.lang.Runtime#getRuntime() & java.lang.System#getSecurityManager()
#### Structural patterns
+ Adapter
- java.util.Arrays#asList() & javax.xml.bind.annotation.adapters.XmlAdapter#marshal() and #unmarshal()
+ Decorator
- All subclasses of java.io.InputStream, OutputStream etc. & java.util.Collections : synchronizedXXX() and unmodifiableXXX() methods.
+ Flyweight
- java.lang.Integer#valueOf(int) (also on other Wrapper classes)
#### Behavioral patterns
+ Chain of responsibility
- javax.servlet.Filter#doFilter() & Exception Handling
+ Command
- java.lang.Runnable
+ Iterator
- All implementations of java.util.Iterator
+ Strategy (recognizeable by behavioral methods in an abstract/interface type which invokes a method in an implementation of a different abstract/interface type which has been passed-in as method argument into the strategy implementation)
- java.util.Comparator#compare(), executed by among others Collections#sort().
+ Template method (recognizeable by behavioral methods which already have a "default" behaviour definied by an abstract type)
- All non-abstract methods of java.util.AbstractList, java.util.AbstractSet and java.util.AbstractMap.

### Spring framework
Spring framework uses:
- reflection : is the ability of a process to examine, introspect, and modify its own structure and behavior.
=> convert string name of class/function to real class or invoke function, eval string as if it was source code

- inversion of control: framework/lib calls ur code instead of ur code calling the lib/framwork
ex: class A uses interface B, construction of B is defined somewhere else. In runtime, framework looks for config, instantiate class B then give it to A

- dependency injection is one form of inversion of control :
main use is to seperate construction vs usage of objects
client just say 'service' it wants and external 'injector' will give it that service to use
Spring uses reflection to implement DI

- adv: well developed ecosystem, faster development, better practices
- disadv: learning curve, overhead, dependent

## Javascript
- scripting, intepreted language, supports multiple paradigm OOP, functional programming.
- widely use in browser, can be used for both frontend and backend.

- V8 engine: compile JS and WebAssembly to machine code

### NodeJS - ExpressJS:
- event driven, single threaded event loop but can scale up by having multiple node running
- async non-blocking I/O
#### How "event driven/event queue/event loop" actually work
- call stack execute 1 at a time
- C++/web browser help with event loop and callback queue
- event loop run continuously, when stack empty, push the first cb in queue to stack

### Frontend
- server side: better control, SEO, more resource heavy, can lead to tight coupling
- client side: less control/safety, harder to do SEO, much less resource heavy on servers

- Jquery: library, lots of handy function to manipulate DOM
- Angular: full platform, UI render, routing, validation, state management, seperate template from js
- AngularJS:
- ReactJS: more like a library, UI render, others are contributed by community. Use jsx, mix html with js. Virtual DOM
most frontend framework uses reusable components

## Database
- What is a database? How does it work? Why use it?
- SQL vs NoSQL
- How to choose a database: read/write intensive? need complex joins? transactional nature? team familiarity? proven reliablity?
- How to index/ design schema?
+ Database migration: 
- What are the steps to take when make changes to database without downtime?
-> Create replicas, loadbalance, divide updates into batches, execute batch each node
- database optimizations (index tuning)

### SQL:
- Schema defined
- Most SQL DB built with ACID principle (atomicity, consistency, isolated, durable)
example:
- atomicity: all or nothing, transaction: A give B 10, then B give C 10. Then either A gives nothing, B gives nothing, or A lose 10 and C get 10.
- consitency: 1 valid state to another: A give B then B give C 10, then A must have 10 less, C has 10 more, B unchanged after transaction. Total A + B + C unchanged
- isolated: many transaction happen at the same time must no interfere with eachother (does not see intermediate state). Leaves database in a state as if concurrent transactions were executed sequentially.
- durable: valid changes are persist, cannot be undone, if fail can restore to closest valid state. write ahead log -> playback -> durable

- Supports complex query joins
MySQL:
- index using B-tree, Bplus-tree:
- Bplus-tree: like B-tree but all reference to data lies in the leaves and leaves are connected -> easier to select a range
- Scale vertically, has some horizontally scaling option such as replication, sharding and partitioning

### NoSQL:
- Schemaless
- NoSQL follows BASE (Basically Available, Soft-state, Eventually consistent)
- Scale horizontally
- No joins
- Faster read-writes operations
MongoDB: Document/BSON based, schemaless, fast read/write, high availability

# Networking

## OSI 7 layer model
1. Physical: BITS on the wire (physical medium) (cable, radio)
2. Data link: FRAME between to NODES physically connected (802.3 Ethernet, 802.11 Wifi)
3. Network: PACKET between NETWORKS , routing (IP)
4. Transport: SEGMENT, DATAGRAM between HOST (TCP, UDP)
5. Session: control open/close connections
6. Presentation: encode, encrypt, serialize, format, compress
7. Application: HTTP, SMTP

## diff HTTP vs HTTPS
- Uses secure socket layer
- Need to trust Certificate Authority and have its public key
- Uses assymetrical encryption when exchanging certificate
- Uses symmetrical encryption when exchanging messages

Signing:
- Server asks CA to sign its certificate with server keypairs
- CA signs certificate with its prikey

Messaging:
- Browser has CA pubkey, its own set of pubkey and prikey
- Server sends certificate to client with CA signature
- Client verifies cert with CA pubkey
- Client sends server a new secret with server's pubkey
- From now on only client and server knows the secret so message can be encrypted using that secret 

## diff HTTP/1 vs HTTP/2
http1: 
- 1 tcp per request
- in text format
http2: 
- 1 tcp, multiple req
- in binary format
- server can push other expected related resources to be used/cached at client (major benefit) example: load user profile, need many images, send 1 request but server can push to have all needed images sent along through 1 tcp connection.
- has secure header compression

## TCP
- TCP/IP handshake
- SYN ACK SYNACK
- How does TCP work? Go-back-N, Sliding window

## diff TCP vs UDP
TCP: 
- connection-oriented : perform handshakes to establish session, 
- ensure reliability, packets are inorder and correct even with network failure (using acknowledgement package, delay transmission, re transmission, erro checking, error recovery parity bits)
- flow control (protect receivers from senders) with buffers
- slower
- used in http, smtp, ftp, apps that require more correctness

UDP: 
- connectionless
- has no order, has error check (checksum) but discard error packets, no handshake
- no flow control, stream or dropped
- faster
- used in realtime: multiplayer online games, voice over ip, streaming

# Web related
## REST API
https://restfulapi.net
- Based resources "resource" and http verbs
- Stateless (Each request has enough info to process)
- GET/POST/PUT usage? -> why? idempotency (call multiple time without changing result)?
- HATEOAS (Hypermedia as the engine of application state) : results has rel/links/methods available so that user know exactly what can be done next

- N+1 problem

- Cookies
- HTTP status



## Security
Why use HTTPS? Man in the middle attack

How to store password: https://kipalog.com/posts/Bam-va-luu-password-dung-cach
-> fast hash, slow hash with salt, encrypt with pepper

Authentication process (authen,author,refresh)
OAuth v2:
- APP redirect to AUTH, USER enter auth info (along with HASH_CHALLENGE and HASH_METHOD if using mobile/SPA)
- AUTH redirect back to APP with CODE
- APP uses CODE and CLIENT_ID and CLIENT_SECRET (or HASH_VERIFIER) to get ACCESS TOKEN
- AUTH verifies then return an ACCESS TOKEN
- APP uses ACCESS TOKEN to performed authorized operations
Note: HASH_VERIFIER is a random string. APP uses HASH_METHOD to hash HASH_VERIFIER into HASH_CHALLENGE.
https://aaronparecki.com/oauth-2-simplified/
Single Sign On

+ OWASP: 
- XXS
- CSRF
- SQL injection
- Broken access control
- Broken authen: default password, password lists and dictionary attacks. uses MD5 instead of SHA256, no salt, no pepper, no https


# OS
## Stack/Heap
Stack vs Heap in OS, how are they used
How process uses memory:
- stack: functions, local variables
- heap: dynamic data, is not "heap" data structure
- static: global variables
- text: actual code
- reserved: for OS, used to read files and other.

## Virtual memory
- https://www.youtube.com/playlist?list=PLiwt1iVUib9s2Uo5BeYmwkDFUh70fJPxX
### Problems with direct mem access:
- Not enough space
- Fragmentation, holes in mem
- Corruption, overwrite
=> Use virtual memory (indirection) to abstract, map to real mem/disk

### Details
what it is:  
Process uses VM, sees memory starts at 0, map program addresses to RAM addresses/Disk

how it works:  
translate virtual address to physical address  
then get the data  

one-one mapping too costly  
=> divide into chunks called pages, map a range to a range of same size => less flexibility when moving

virtual address = virtual page number(20 bit) + page offset (12 bit)  
virtual page number gets translated to physical page number, offset stays the same for both

Linux has random offset in virtual address space to enhance security

### Page faults
Paging:
Evict a page in RAM and writes to disk  
Read page from disk to RAM  
Update page table  
=> very slow but helps from crashing

### How to make it fast
Translation Lookaside Buffer (basically a page table cache):
tag (virtual page number) + physical page number  
Each program needs its own page table => cost too much space  
=> Need more indirection

### Multi level page tables
1st level page table 10 bits, 2nd level page table 10 bits
only need to keep 1st level page table in RAM all time, 2nd level can be paged in and out

### Another level of cache
- Virtual cache, look up direct data using virtual address but it cant be used by many programs cuz virtual addresses can collide

VIPT (Virtually Indexed, Physically Tagged): best of both worlds  
Look up using virtual address, verify using physical address tag  
Look up in cache and TLB at the same time then check hit/miss  
So from what I understand after watching this and others on YT is this:  
In VIPT the cache is indexed using offset and it stores the actual data and PA (its called physical tag here).  
We use the VA and TLB to find the PA. At the same time, we use the offset to find data and also PA. Then we compare 2 PA if hit then return data, if miss then we get data from RAM and maybe update cache and TLB

## Thread vs process

## CPU scheduling

# Architecture
https://github.com/donnemartin/system-design-primer

How to choose a tech stack? Programming language? communication protocol? database? architecture?

What happens if too much traffic?

What happens if something fails?

Caching

CAP theorem

Monolith vs Microservices

Microservices:
adv: 
- inpedently scale and monitor
- parallel development
- better to understand when well defined
dis:
- operational complexity
- network overhead > interprocess communication
- hard to debug
- architectural complexity

Service-oriented arch

Data-oriented arch

Event-sourcing: state changes are logged as a time-ordered sequence of records

Command query responsibility segragation: splitting up read/write to different repository interface, only perform command on 1 interface, and query on another, the 2 repo are synchorinized in background through some mechanisms.

Service mesh

High availability

# Testing
- Edge cases?

- Reason/When to write tests?

- test functions
- test modules
- test end to end

- Unit testing
- Integration testing
- System testing

# Git
## How git works
http://gitlet.maryrosecook.com/docs/gitlet.html

- Store content in blob
- Store tree of repo, each tree node reference blob
- Store hash chain of commit referencing tree

Git - Different types of git flows: 

GitFlow: 
- https://nvie.com/posts/a-successful-git-branching-model/
- dev/features
- staging/prod/hotfix

GitHub Flow: 
- https://guides.github.com/introduction/flow/
- master/features

GitLab Flow: 
- https://docs.gitlab.com/ee/topics/gitlab_flow.html
- master/staging/production

# Containers

diff virtual machines and docker

Docker, K8s - containerization tech

## How docker works
https://www.youtube.com/watch?v=8fi7uSYlOdc
containerize: limit namespaces and cgroups and mounts, what the process sees, and what the process can use. Pack dependencies up
, have process manager for real time metrics. Auto restarts

k8s: orchestration: help with resize,start,stop,restart,remove containers automatically

# CI/CD
- CI/CD : basically auto run scripts/workflows when changes are made to codebase
- CI: auto run tests/builds when code is committed/pushed
- CD: auto run tests/builds/deploys

# Message queue
RabbitMQ

Kafka:
- event streams -> receive, process, react, route, store realtime data
- producers (write events) and consumers (read/process events)
- events organized into TOPICs (like files and folders)
- topics are partitioned to allow simultaneous read/write
- has a guarantee that event in topic-partition is read same order as written
- topics are replicated to ensure durability

# Log/Monitoring
ELK:
- Logstash: store/parse log into object
- Elasticsearch: index object for fast full text search and aggregation
- Kibana: dashboard + visualization

Monitor:
- Prometheus: scrape and store time series data for real time monitoring
- Alert manager

# Blockchain
What is blockchain? www.geeksforgeeks.org/introduction-to-blockchain/

Peer to peer, blockchain available to all nodes

decentralized vs centralized vs distributed

Transactions stores on 'blocks' linked together through hash of previous block

Block has:
- Previous Hash
- The timestamp
- Nonce
- Merkle tree root

Crypto currencies are insentive to process transactions and make blocks

adv:
- Decentralized
- Transparent
- Immutable

disadv:
- hard to scale
- human errors

+ Consensus algorithms:
- Proof of Work:
- Proof of Stake:
- Delegated Proof of Stake 108:

- Ethereum Smart Contract: Code/software that runs on blockchain

# Cloud
Difference between IaaS, PaaS, SaaS
