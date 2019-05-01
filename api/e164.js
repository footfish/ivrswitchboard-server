import express from 'express'
import E164 from '../model/e164Model'

const router = express.Router()

router.get('/',  async(req, res) => {
  if (! RegExp('^[1-9][0-9]{0,2}$').test(req.query.cc) || ! RegExp('^[1-9][0-9]{0,4}$').test(req.query.ndc)) {
    res.status(400).send('query fields not present or incomplete')
  } else try{

    const e164 = await E164.findRandom20(req.query.cc,req.query.ndc)
    if (e164) return res.status(200).json(e164)
    else return res.sendStatus(404)
  } catch (error) {
    return res.status(400).send(error.message)
  }
})


export default router