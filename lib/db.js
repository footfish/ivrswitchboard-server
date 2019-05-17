import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { createBucket } from 'mongoose-gridfs'

dotenv.config()

// Connect to database
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true,  useFindAndModify: false, useCreateIndex: true })
export const dbConnection = mongoose.connection
export var recordingsBucket

dbConnection.on('error', (err) => {
    console.log(`database connection error: ${err}`)
})

dbConnection.on('disconnected', () => {
    console.log('database disconnected')
})

dbConnection.once('open', () => {
    recordingsBucket = createBucket()
    console.log(`database connected to ${dbConnection.name} on ${dbConnection.host}`)
})