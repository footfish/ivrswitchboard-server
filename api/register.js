import express from 'express'
import {newSwitchboard} from '../model/switchboardData'
import {newAccount} from '../model/accountData'
import {markE164Used} from '../model/e164Data'
import asyncHandler from 'express-async-handler'

const router = express.Router()

// Register new account 
router.post('/', asyncHandler(async (req, res, next) => {
  if (req.query.action === 'register')  
    {
     if (!req.body.email || !req.body.password || !req.body.first_name || !req.body.last_name || !req.body.mobile_number || ! req.body.switchboard_number) {  //check all fields are present  
       res.status(400).send('required fields not present or incomplete')
     } else try {
      const e164Array = req.body.switchboard_number.slice(1).split("-") 
      await markE164Used({cc: e164Array[0], ndc: e164Array[1], number: e164Array[2]})
      const newSwitchboardId = await newSwitchboard(req.body.switchboard_number) 
      await newAccount( req.body.email, req.body.password, req.body.first_name, req.body.last_name, req.body.mobile_number, newSwitchboardId)
      res.status(201).send('Created new account')
     } catch(error) {
      res.status(500).send(`There has been a problem creating that account. ${error}`) //error adding account 
     }
  } else
  return next()
}))

export default router
