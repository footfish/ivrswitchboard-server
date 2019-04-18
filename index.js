import dotenv from 'dotenv'
import express from 'express'
import switchboardRouter from './api/switchboard'
import registerRouter from './api/register'
import authRouter from './api/auth'
import accountRouter from './api/account'
import e164Router from './api/e164'
import passport from './lib/auth';


import {newSwitchboard,clearAllSwitchboards} from './api/switchboard/switchboardData'
import {newAccount, clearAllAccounts} from './api/account/accountData';
import {loadE164s} from './api/e164/e164Data'

import bodyParser from 'body-parser';
import './lib/db'

dotenv.config()

const app = express()
const port = process.env.PORT


if (process.env.seedDb) { //dev only 
  console.log("Developer mode: Will clear up database")
  clearAllAccounts()
  .then( () => clearAllSwitchboards())
  .then( () => newSwitchboard('0123456789') )
  .then( newSwitchboardId => newAccount( 'dummy@email.com', 'dummy', 'John', 'Doe', '0123456789', newSwitchboardId))
  .catch( err => console.log(err))

  loadE164s()
 }

app.use(passport.initialize())
app.use(express.static('../client/build')) //serve react client 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/auth', authRouter)
app.use('/api/e164', e164Router)
app.use('/api/account', registerRouter) //no auth on register 
app.use('/api/account', passport.authenticate('jwt', {session: false}), accountRouter)
app.use('/api/switchboard', passport.authenticate('jwt', {session: false}), switchboardRouter)

app.listen(port, () => {
  console.info(`Server running at ${port}`)
})

