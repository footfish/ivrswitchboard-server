import supertest from 'supertest'
import {expect} from 'chai'
import 'chai/register-should'
import {app} from '../index.js'
import fs from 'fs'

let token



// UNIT test begin
describe('Switchboard API test', function(){
    this.timeout(120000)
    // get token first 
    before( function(done){
        this.timeout(120000)
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
            token=res.body.access_token
            done()
        }).catch( err => done(err))
    })
    // test #1: 
    it('Read switchboard - Should return 200 with switchboard object', (done) => {
        supertest(app)
            .get('/api/switchboard')
            .set('Authorization', token)
            .expect('Content-type', /json/)
            .then(res => {
                expect(res.statusCode).to.equal(200)
                res.body.should.have.property('schedule')
                res.body.should.have.property('openMenu')
                res.body.should.have.property('closedMenu')
                res.body.should.have.property('recordings')
                res.body.should.have.property('number').to.equal('0123456789')
                res.body.should.have.property('routeOption')
                done()
            }).catch( err => done(err))
    })
    // test #2: 
        it('Change switchboard - Should return 200 with updated switchboard object', (done) => {
            supertest(app)
                .patch('/api/switchboard')
                .send({
                    "routeOption": "alwayOpen"
                })
                .set('Authorization', token)
                .expect('Content-type', /json/)
                .then(res => {
                    expect(res.statusCode).to.equal(200)
                    res.body.should.have.property('schedule')
                    res.body.should.have.property('openMenu')
                    res.body.should.have.property('closedMenu')
                    res.body.should.have.property('recordings')
                    res.body.should.have.property('number')
                    res.body.should.have.property('routeOption').to.equal('alwayOpen')
                    done()
                }).catch( err => done(err))
        })
    // test #3: 
    it('Change switchboard with illegal value  - Should return 400 Bad Request', (done) => {
        supertest(app)
            .patch('/api/switchboard')
            .send({
                "routeOption": "neverOpen"
            })
            .set('Authorization', token)
            .expect('Content-type', /text/)
            .then(res => {
                expect(res.statusCode).to.equal(400)
                expect(res.text).to.include('Validation failed')
                expect(res.body).to.be.empty
                done()
            }).catch( err => done(err))
    })
    // test #4: 
    it('Upload recording - Should return 200', (done) => {
        supertest(app)
            .post('/api/recording/0')
            .field({recordinglabel:"test upload"})
            .attach('recording', './default_recordings/welcome.mp3')
            .set('Authorization', token) 
            .expect('Content-type', /text/)
            .then(res => {
                expect(res.statusCode).to.equal(200)
                expect(res.text).to.equal('OK')
                expect(res.body).to.be.empty
                done()
            }).catch( err => done(err))
    })
    // test #5: 
        it('Check uploaded recording meta data - Should return 200 with switchboard object', (done) => {
            supertest(app)
                .get('/api/switchboard')
                .set('Authorization', token)
                .expect('Content-type', /json/)
                .then(res => {
                    expect(res.statusCode).to.equal(200)
                    res.body.should.have.property('recordings')
                    expect(res.body.recordings[0]).to.be.deep.equal({ label: "test upload", src: "/api/recording/0"})
                    done()
                }).catch( err => done(err))
        })
    // test #6: 
    it('Check downloaded recording - Should return file stream (same as uploaded)', (done) => {
        supertest(app)
            .get('/api/recording/0')
            .set('Authorization', token)
            .then(res => {
                expect(res.statusCode).to.equal(200)
                const testFile = fs.readFileSync('./default_recordings/welcome.mp3')
                expect(res.text.toString()).to.equal(testFile.toString())
                done()
            }).catch( err => done(err))
    })

})
