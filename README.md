# Ts3Info

My first ever coding Project.
Was done cause i was really interested into Coding and it helped me getting started.

Only has a limited set of Features but might as well add a README for anyone stumbling over this.

It's based on plain HTML with ejs as renderer and koaRouter as a Backend "API" to serve the Content.
for TS3 Query Support im using:
```
https://github.com/Multivit4min/TS3-NodeJS-Library
```
The Code is very unclean and uncommented as you would guess, it being my first Project.

## Getting started:
```
git clone https://github.com/Morpheus235/Ts3Info
cd Ts3Info
npm install
```
 
 ## Configuration
 
Server Information and Query Information need to be provided:
.env.example provided
fill out and save as .env
 
```
  HOST=
  QUERYPORT=
  SERVERPORT=
  QUERY_USERNAME=
  QUERY_PASSWORD=
  NICKNAME=
  KOA_PORT=
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
* Kicking Users
* Banning Users
* Join Button for Teamspeak Server
