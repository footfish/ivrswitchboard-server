import express from 'express'
import GridFSStorage from 'multer-gridfs-storage'
import multer from 'multer'
import Switchboard from '../model/switchboardModel'
import util from 'util'
import {dbConnection, recordingsBucket} from '../lib/db'

const MAX_RECORDINGS = 30
const MIME_TYPES=['audio/wave','audio/mp3','audio/wav','audio/mpeg']

const router = express.Router()

const audioFileFilter = (req, file, cb) => { //filter for upload of supported audio file mime types 
    if (MIME_TYPES.includes(file.mimetype)) cb(null, true)
    else cb(new Error('unsupported file type '+file.mimetype))
    }
const audioFileLimits = {fileSize: 7340032} // max upload file size (7M)

//upload sound recording to db (into switchboard position 'index')
router.post('/:index', async(req, res) => {
    try {
        if( req.params.index < 0 || req.params.index > MAX_RECORDINGS) return res.status(400).send('File not uploaded - invalid index in url') 
        const deleteFile = util.promisify(recordingsBucket.deleteFile).bind(recordingsBucket) //bind required because of context change 
        const ignoreError = (promise) => promise.catch(e => undefined) //prevent catch on delete of non-existant file (1st upload)
        await ignoreError(deleteFile(req.user.switchboard_id+req.params.index)) //delete file if it already exists 
        const gridFsStorage = new GridFSStorage({ db: dbConnection, file: (req, file) => { return {id: req.user.switchboard_id + req.params.index }} })//file id = switchboard_id + index
        const upload = util.promisify(multer({ storage: gridFsStorage, fileFilter: audioFileFilter, limits: audioFileLimits }).single('recording')   ) //promisify to catch multer errors
        await upload(req, res)  
        const switchboard = await Switchboard.findById(req.user.switchboard_id) //switchboard_id from auth result
        if (switchboard.recordings.length <= req.params.index) { // increase recordings array if we need it 
            for(let n = switchboard.recordings.length; n<=req.params.index; n++  ) switchboard.recordings.push({})
        }
        switchboard.recordings[req.params.index].label = req.body.recordinglabel //Store label
        switchboard.recordings[req.params.index].src = req.file.originalname //Store original filename 
        switchboard.save()
        return res.sendStatus(200)
    } catch (err) {
        return res.status(400).send('File not uploaded - '+ err.message) //catch other errors 
    }
})

//streams sound recording file _id = switchboard_id+index
router.get('/:index', async(req, res) => {
    try{
        if( req.params.index < 0 || req.params.index > MAX_RECORDINGS) return res.sendStatus(404)
        const findById = util.promisify(recordingsBucket.findById).bind(recordingsBucket) //bind required because of context change 
        const foundFile = await findById(req.user.switchboard_id+req.params.index) // file _id = switchboard_id+index
        const readStream = recordingsBucket.createReadStream({ _id: foundFile._id})
        res.set('content-type', foundFile.contentType )
        readStream.pipe(res)
    } catch (err) {
        return res.sendStatus(404) 
    }
      })

export default router