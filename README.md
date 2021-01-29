# Ts3Info

My first ever coding Project.
Was done cause i was really interesting into Coding and it helped me getting started.

Only has a limited set of Features but might as well add a README for anyone stumbling over this.

## Getting started:
```
git clone https://github.com/Morpheus235/Ts3Info
cd Ts3Info
npm install
```
 
 ## Configuration
 
Server Information and Query Information need to be provided:
found in scripts/script.js
 
```
{
    host: "gamers-union.de",
    queryport: 10011,
    serverport: 9987,
    username: "serveradmin",
    password: "",
    nickname: "Webinterface"
}
```

## Starting the Application
```
node main.js
```
The application can now be accessed under:

``` 
http://localhost:4000
```

## Features
* Listing Users
* Messaging and Poking Users
* List Channels
* get Information about the Server
