import supertest from 'supertest'
import {expect} from 'chai'
import 'chai/register-should'
import {app, server} from '../index.js'
import mongoose from 'mongoose'


before( function(done){
    this.timeout(120000)
    app.on('testDataReady', () => { //make sure db is ready with test data 
        done();
    })
})

// UNIT test begin
describe('Auth API test', function(){
    this.timeout(120000)
    // test #1: _
    it('Successful login - auth should return 200 with bearer token', (done) => {
        supertest(app)
            .post('/api/auth')
            .send({
                email: 'dummy@email.com',
                password: 'dummy'
            })
            .expect('Content-type', /json/)
            .then(res => {
                expect(res.statusCode).to.equal(200)
                res.body.should.have.property('access_token').with.lengthOf(167)
                done()
            }).catch( err => done(err))
    })
    // test #2: 
    it('Test wrong password - should return 401 Unauthorized', (done) => {
            supertest(app)
                .post('/api/auth')
                .send({
                    email: 'dummy@email.com',
                    password: 'xxx'
                })
                .expect('Content-type', /text/)
                .then(res => {
                    expect(res.statusCode).to.equal(401)
                    expect(res.error.text).to.equal("Unauthorized")
                    expect(res.body).to.be.empty
                    done()
                }).catch( err => done(err))
            })
    // test #3: 
    it('Test unknown email address - should return 401 Unauthorized', (done) => {
        supertest(app)
            .post('/api/auth')
            .send({
                email: 'xxx',
                password: 'dummy'
            })
            .expect('Content-type', /text/)
            .then(res => {
                expect(res.statusCode).to.equal(401)
                expect(res.error.text).to.equal("Unauthorized")
                expect(res.body).to.be.empty
                done()
            }).catch( err => done(err))
        })
    // test #4: 
    it('Test missing email parameter - should be 400 Bad Request', (done) => {
        supertest(app)
            .post('/api/auth')
            .send({
                password: 'dummy'
            })
            .expect('Content-type', /text/)
            .then(res => {
                expect(res.statusCode).to.equal(400)
                expect(res.error.text).to.equal("Email and password required.")
                done()
            }).catch( err => done(err))
        })
    // test #5: 
    it('Test missing password parameter - should be 400 Bad Request', (done) =>  {
        supertest(app)
            .post('/api/auth')
            .send({
                email: 'dummy@email.com'
            })
            .expect('Content-type', /text/)
            .then(res => {
                expect(res.statusCode).to.equal(400)
                expect(res.error.text).to.equal("Email and password required.")
                done()
            }).catch( err => done(err))
        })
})

after(function (done) {    //gracefull end to tests
    server.close()
    mongoose.connection.close()
    console.log("finished tests. Closed server and database")
    done()
})