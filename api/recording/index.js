import express from 'express'
import asyncHandler from 'express-async-handler'
import GridFSStorage from 'multer-gridfs-storage'
import multer from 'multer'

import {dbConnection, gfs} from '../../lib/db'

const router = express.Router()

const audioFileFilter = (req, file, cb) => { //filter to allow supported audio types 
    if (file.mimetype === 'audio/mp3' || file.mimetype === 'audio/wav') cb(null, true)
    else cb(new Error('unsupported file type '+file.mimetype))
    }
const audioFileLimits = {fileSize: 7340032} // max upload file size (7M)
const gridFsStorage = new GridFSStorage({ db: dbConnection})
const upload = multer({ storage: gridFsStorage, fileFilter: audioFileFilter, limits: audioFileLimits }).single('recording')   


router.get('/:fileName', asyncHandler(async(req, res) => {
    gfs.files.find({ filename: req.params.fileName }).toArray(function (err, files) { //gfs.findOne broken -https://github.com/aheckmann/gridfs-stream/issues/125
        if (err) res.sendStatus(404)
        res.set('content-type', files[0].contentType )
        gfs.createReadStream({ filename: files[0].filename }).pipe(res) //read from db as stream and pipe to http response
      })
}))


router.post('/', (req, res) => {
        upload (req, res, err => { // file upload and store in mongo gridFs store 
        if(!err) {
            if (req.file) {
                console.log('Uploading file...'+req.file.filename+' '+req.file.originalname )
                var filename = req.file.filename
                var uploadStatus = 'File Uploaded Successfully'
                res.sendStatus(200)
            } else {
                res.status(500).send('Upload Failed') 
            } 
        } else {
         res.status(400).send('File not uploaded - '+ err.message) //catch multer and other upload errors 
        }
})})

export default router