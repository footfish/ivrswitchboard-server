import express from 'express'
import asyncHandler from 'express-async-handler'
import GridFSStorage from 'multer-gridfs-storage'
import multer from 'multer'

import {dbConnection, gfs} from '../../lib/db'

const router = express.Router()

const audioFileFilter = (req, file, cb) => { //filter for upload of supported audio types 
    if (file.mimetype === 'audio/mp3' || file.mimetype === 'audio/wav') cb(null, true)
    else cb(new Error('unsupported file type '+file.mimetype))
    }
const audioFileLimits = {fileSize: 7340032} // max upload file size (7M)
const gridFsStorage = new GridFSStorage({ db: dbConnection})
const upload = multer({ storage: gridFsStorage, fileFilter: audioFileFilter, limits: audioFileLimits }).single('recording')   

router.post('/', (req, res) => {

        upload (req, res, err => { // file upload and store in mongo gridFs store 
        if(err) res.status(400).send('File not uploaded - '+ err.message) //catch multer and other upload errors 

        if (req.file) {
            console.log('Uploading file...'+req.file.filename+' '+req.file.originalname )
            var filename = req.file.filename
            var uploadStatus = 'File Uploaded Successfully'
            res.sendStatus(200)
        } else {
            res.status(500).send('Upload Failed') 
        } 
})})

//streams 'fileName' from db
router.get('/:fileName', asyncHandler(async(req, res) => {
    try{
        //before getting file we need to verify it's in the switchboard for this user. 
        const files = await gfs.files.find({ filename: req.params.fileName }).toArray()  //gfs.findOne broken -https://github.com/aheckmann/gridfs-stream/issues/125
        const file=files[0]
        res.set('content-type', file.contentType )
        gfs.createReadStream({ filename: file.filename }).pipe(res) //read from db as stream and pipe to http response
    } catch (err) {
        console.log(err)
        res.sendStatus(404)
    }
      })
)

export default router