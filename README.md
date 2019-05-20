# Assignment 2 - IVR switchboard server (Node/Express API)
Name: Kevin Brennan 



## Web API Endpoint Reference
The server web api provides an interface for;
- Phone number (e164) selection (selected on new account registration form)
- Login/authentication using Java Web Tokens 
- Account registration (includes number reservation) & Closure
- Read of account details
- Read and update of switchboard 
- Upload and streaming of audio files (from mongo db) 

## Web API Install and Operation
Below are installation instructions for api server (only). 
 *Note: For alternative full stack installed [see here](https://github.com/footfish/ivrswitchboard-fullstack)*

### Pre-requisites 
You will need a running mongo database 

### Get the code
Clone this repo locally. Then run `npm install` to install all required dependencies

### Configuration 
The server is configured using environmental variables. You will need to create a `.env` file in the servers root folder to set these.

```
NODE_ENV=development
PORT=8080
HOST=localhost
MONGODB_URI=${Put your mongo db here}
seedDb=true
JWT_SECRET=${Put your secret here}
```

### Running Server
Run the server in development mode (seeds database, runs nodemon so restarts with file changes)
```
npm run dev 
```
Run the server normal mode 
```
npm start
```

## API Design

| Resource                       | Auth |     GET            |    POST    |   PATCH              |   DELETE        |
| ------------------------------ | ---- | ------------------ | ---------- | -------------------- |---------------- |
| /api/e164?cc=353&ndc=818       |  N   | find 20 numbers    |            |                      |                 |
| /api/auth                      |  N   |                    | jwt (login)|                      |                 |
| /api/account?action=register   |  N   |                    | sign up    |                      |                 |
| /api/account                   |  Y   | read account       |            | *update account* **  | close account   |
| /api/switchboard               |  Y   | read switchboard   |            | update switchboard   |                 |
| /api/recording/:index          |  Y   | stream             | upload     |                      |                 |
| */api/paymethod* **            |  Y   | read cc/pay inf.   |            | update cc/pay  info. |                 |
| */api/billing* **              |  Y   | read billing inf.  |            | update billing info. |                 |
**NOT IMPLEMENTED

## Security and Authentication
Authentication uses JWT (Java Web Tokens). Resources requiring authentication are indicated in the table above. 
The JWT can be passed as in the *Authorization header* or as a *query string* . Header authorization is preferred but query string auth is necessary for audio file playback. 

## Testing 
Testing is performed against api using supertest & mocha (mix of expect and should). Pretty formatting with mochawsome. Coverage with nyc. File upload/download test is included. Express emit is used to ensure db is ready. 

To run tests;
```
npm run test
```

Test output;

```
Starting tests. Db data ready.
  Auth API test
    √ Successful login - auth should return 200 with bearer token (508ms)
    √ Read  account - Should return 200 with account object (271ms)
    √ Test wrong password - should return 401 Unauthorized (413ms)
    √ Test unknown email address - should return 401 Unauthorized (130ms)
    √ Test missing email parameter - should be 400 Bad Request
    √ Test missing password parameter - should be 400 Bad Request

  Account registration API test
    √ E164 list - auth should return 200 with list of 20 numbers (157ms)
    √ Test register - should return 201 Created (860ms)
    √ Successful new account login - auth should return 200 with bearer token (422ms)
    √ Failed register (used number) - should return 500 Error (148ms)
    √ Failed register (missing parameter) - should return 400 Bad Request
    √ Read new account - Should return 200 with account object (256ms)
    √ Delete account - should return 200 (279ms)
    √ Check token no longer works - Should return 401 Unauthorized (156ms)
    √ Check deleted login not working - should return 401 Unauthorized (137ms)

  Switchboard API test
    √ Read switchboard - Should return 200 with switchboard object (306ms)
    √ Change switchboard - Should return 200 with updated switchboard object (310ms)
    √ Change switchboard with illegal value  - Should return 400 Bad Request (137ms)
    √ Upload recording - Should return 200 (2083ms)
    √ Check uploaded recording meta data - Should return 200 with switchboard object (297ms)
    √ Check downloaded recording - Should return file stream (same as uploaded) (901ms)

finished tests. Closed server and database.

  21 passing (11s)
```
## Extra features
-  Gridfs file streaming upload/download
-  No babel (uses ECMAScript module loader) 


## References 
Deploying a React app with React-Router and an Express Backend - https://dev.to/nburgess/creating-a-react-app-with-react-router-and-an-express-backend-33l3  
How to Setup React and Node JS in a project - https://www.codementor.io/kakarganpat/how-to-setup-react-and-node-js-in-a-project-koxwqbssl  
Let’s build a full stack MongoDB, React, Node and Express (MERN) app - https://medium.com/javascript-in-plain-english/full-stack-mongodb-react-node-js-express-js-in-one-simple-app-6cc8ed6de274  
Using Async Await in Express with Node 11 - https://medium.com/@Abazhenov/using-async-await-in-express-with-node-8-b8af872c0016   
express guide - http://expressjs.com/en/guide/routing.html  
https://www.npmjs.com/package/esm  
multer - https://www.npmjs.com/package/multer  
Multer's GridFS storage engine - https://www.npmjs.com/package/multer-gridfs-storage  
Uploading and retrieving a file from GridFS using Multer - https://medium.com/@kavitanambissan/uploading-and-retrieving-a-file-from-gridfs-using-multer-958dfc9255e8  
gridfs-stream - https://www.npmjs.com/package/gridfs-stream *outdated, switched to mongoose-gridfs*  
mongoose-gridfs - https://www.npmjs.com/package/mongoose-gridfs  
gridfs API mongoose-gridfs/DOCUMENTATION.md https://github.com/lykmapipo/mongoose-gridfs/blob/5163078944be05652946339e8d05d4b233fb2217/DOCUMENTATION.md   
Node.js Streams: Everything you need to know - https://medium.freecodecamp.org/node-js-streams-everything-you-need-to-know-c9141306be93  
Uploading files/images to MongoDB using GridFS - https://blog.zairza.in/uploading-files-images-to-mongodb-using-gridfs-c16f4eba777   
Uploading/Streaming Audio using NodeJS + Express + MongoDB/GridFS - https://medium.com/@richard534/uploading-streaming-audio-using-nodejs-express-mongodb-gridfs-b031a0bcb20f   
Node.js: Multer upload with promise? - https://stackoverflow.com/questions/45540560/node-js-multer-upload-with-promise  
(MongoDB) The GridFS API - http://mongodb.github.io/node-mongodb-native/2.1/tutorials/gridfs/streaming/ *not used, but would be good alternative to implement directly*   
Mocha test framework - https://mochajs.org     
Chai Assertion Library - https://www.chaijs.com/    
Supertest - https://www.npmjs.com/package/supertest    
Testing native ES modules using Mocha and esm - https://alxgbsn.co.uk/2019/02/22/testing-native-es-modules-mocha-esm/   
Waiting for DB connections before app-listen in node.- https://blog.cloudboost.io/waiting-for-db-connections-before-app-listen-in-node-f568af8b9ec9    
Ensure Express App has started before running Mocha/Supertest tests - https://mrvautin.com/ensure-express-app-started-before-tests/   
Deploying - https://facebook.github.io/create-react-app/docs/deployment   


