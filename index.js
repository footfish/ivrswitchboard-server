import dotenv from 'dotenv'
import express from 'express'
import switchboardRouter from './api/switchboard'
import accountRouter from './api/account'
import passport from './lib/auth';

import loadSwitchboards from './api/switchboard/switchboardData'
import loadAccounts from './api/account/accountData';

import bodyParser from 'body-parser';
import './lib/db'

dotenv.config()

const app = express()
const port = process.env.PORT


if (process.env.seedDb) {
  loadSwitchboards()
  loadAccounts()
}

app.use(passport.initialize())
app.use(express.static('../client/build'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/account', accountRouter)
app.use('/api/switchboard', passport.authenticate('jwt', {session: false}), switchboardRouter)

app.listen(port, () => {
  console.info(`Server running at ${port}`)
})

