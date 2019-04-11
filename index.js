import dotenv from 'dotenv'
import express from 'express'
import switchboardRouter from './api/switchboard'
import loadSwitchboards from './api/switchboard/switchboardData'

import bodyParser from 'body-parser';
import './db'

dotenv.config()

const app = express()
const port = process.env.PORT


if (process.env.seedDb) {
  loadSwitchboards()
}


app.use(express.static('../client/build'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/switchboard', switchboardRouter)

app.listen(port, () => {
  console.info(`Server running at ${port}`)
})

