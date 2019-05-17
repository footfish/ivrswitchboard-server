//Wraps tests to runs in preferred order 
import {app, server} from '../index.js'
import mongoose from 'mongoose'

import './testAuthApi'
import './testRegisterApi'

before( function(done){
    this.timeout(120000)
    app.on('testDataReady', () => { //make sure db is ready with test data 
        console.log("Starting tests. Db data ready.")
        done();
    })
})


after(function (done) {    //gracefull end to tests
    server.close()
    mongoose.connection.close()
    console.log("finished tests. Closed server and database.")
    done()
})