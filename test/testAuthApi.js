import supertest from 'supertest'
import {expect} from 'chai'
import 'chai/register-should'
import {app} from '../index.js'

let token

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
                res.body.should.have.property('access_token').that.is.a('string').to.include('Bearer')
                token = res.body.access_token
                done()
            }).catch( err => done(err))
    })
    // test #2: 
    it('Read  account - Should return 200 with account object', (done) => {
        supertest(app)
            .get('/api/account')
            .set('Authorization', token)
            .expect('Content-type', /json/)
            .then(res => {
                expect(res.statusCode).to.equal(200)
                expect(res.body).to.deep.include({ email: 'dummy@email.com'})
                done()
            }).catch( err => done(err))
    })
    // test #3: 
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
    // test #4: 
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
    // test #5: 
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
    // test #6: 
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
