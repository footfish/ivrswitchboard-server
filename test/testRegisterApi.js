import supertest from 'supertest'
import {expect} from 'chai'
import 'chai/register-should'
import {app} from '../index.js'

let token

// UNIT test begin
describe('Account registration API test', function(){
    this.timeout(120000)
    // test #1: _
    it('E164 list - auth should return 200 with list of 20 numbers', (done) => {
        supertest(app)
            .get('/api/e164?cc=353&ndc=818')
            .expect('Content-type', /json/)
            .then(res => {
                expect(res.statusCode).to.equal(200)
                expect(res.body).to.have.property('e164').with.length(20)
                done()
            }).catch( err => done(err))
    })
    // test #2: 
    it('Test register - should return 201 Created', (done) => {
            supertest(app)
                .post('/api/account?action=register')
                .send({
                    email: 'newaccount@email.com',
                    password: 'anypassword',
                    first_name: 'john',
                    last_name: 'doe',
                    mobile_number: '0123456789',
                    switchboard_number: '+353-818-123100', //must be from e164 test data
                })
                .expect('Content-type', /text/)
                .then(res => {
                    expect(res.statusCode).to.equal(201)
                    expect(res.text).to.equal("Created new account")
                    expect(res.body).to.be.empty
                    done()
                }).catch( err => done(err))
            })
    // test #3: 
    it('Successful new account login - auth should return 200 with bearer token', (done) => {
        supertest(app)
            .post('/api/auth')
            .send({
                email: 'newaccount@email.com',
                password: 'anypassword'
        })
            .expect('Content-type', /json/)
            .then(res => {
                expect(res.statusCode).to.equal(200)
                res.body.should.have.property('access_token').that.is.a('string').to.include('Bearer')
                token=res.body.access_token
                done()
            }).catch( err => done(err))
    })
    // test #4: 
    it('Failed register (used number) - should return 500 Error', (done) => {
        supertest(app)
            .post('/api/account?action=register')
            .send({
                email: 'newaccount2@email.com',
                password: 'anypassword2',
                first_name: 'Joe',
                last_name: 'Dohn',
                mobile_number: '0123456789',
                switchboard_number: '+353-818-123100', // already used above
            })
            .expect('Content-type', /text/)
            .then(res => {
                expect(res.statusCode).to.equal(500)
                expect(res.text).to.include('164 number already used')
                expect(res.body).to.be.empty
                done()
            }).catch( err => done(err))
        })    
    // test #5: 
    it('Failed register (missing parameter) - should return 400 Bad Request', (done) => {
        supertest(app)
            .post('/api/account?action=register')
            .send({
                email: 'newaccount2@email.com',
                first_name: 'Joe',
                last_name: 'Dohn',
                mobile_number: '0123456789',
                switchboard_number: '+353-818-123101', // already used above
            })
            .expect('Content-type', /text/)
            .then(res => {
                expect(res.statusCode).to.equal(400)
                expect(res.error.text).to.include('required fields not present')
                expect(res.body).to.be.empty
                done()
            }).catch( err => done(err))
        })
    // test #6: 
    it('Read new account - Should return 200 with account object', (done) => {
        supertest(app)
            .get('/api/account')
            .set('Authorization', token)
            .expect('Content-type', /json/)
            .then(res => {
                expect(res.statusCode).to.equal(200)
                expect(res.body).to.be.deep.equal({ email: 'newaccount@email.com', first_name: 'john', last_name: 'doe', mobile_number: '0123456789' })
                done()
            }).catch( err => done(err))
    })
    // test #7: 
        it('Delete account - should return 200', (done) => {
            supertest(app)
                .delete('/api/account')
                .set('Authorization', token)
                .expect('Content-type', /text/)
                .then(res => {
                    expect(res.statusCode).to.equal(200)
                    expect(res.text).to.equal('OK')
                    expect(res.body).to.be.empty
                    done()
                }).catch( err => done(err))
            })
    // test #8: 
    it('Check token no longer works - Should return 401 Unauthorized', (done) => {
        supertest(app)
            .get('/api/account')
            .set('Authorization', token)
//            .expect('Content-type', /text/)
            .then(res => {
                expect(res.statusCode).to.equal(401)
                expect(res.text).to.equal('Unauthorized')
                expect(res.body).to.be.empty
                done()
            }).catch( err => done(err))
    })
    // test #9: 
    it('Check deleted login not working - should return 401 Unauthorized', (done) => {
        supertest(app)
            .post('/api/auth')
            .send({
                email: 'newaccount@email.com',
                password: 'anypassword'
            })
            .expect('Content-type', /text/)
            .then(res => {
                expect(res.statusCode).to.equal(401)
                expect(res.error.text).to.equal("Unauthorized")
                expect(res.body).to.be.empty
                done()
            }).catch( err => done(err))
        })

})
