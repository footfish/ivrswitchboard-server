import dotenv from 'dotenv'
import express from 'express'
import switchboardRouter from './api/switchboard'

dotenv.config()

const app = express()
const port = process.env.PORT

app.use(express.static('public'))
app.use('/api/switchboard', switchboardRouter)

app.listen(port, () => {
  console.info(`Server running at ${port}`)
})

