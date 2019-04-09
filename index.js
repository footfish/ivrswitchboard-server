import dotenv from 'dotenv'
import express from 'express'
import switchboardRouter from './api/switchboard'
import bodyParser from 'body-parser';

dotenv.config()

const app = express()
const port = process.env.PORT

app.use(express.static('../client/build'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use('/api/switchboard', switchboardRouter)

app.listen(port, () => {
  console.info(`Server running at ${port}`)
})

