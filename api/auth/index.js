import express from 'express'
import Account from '../../api/account/accountModel'

import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'

const router = express.Router()

// Authenticate and get JWT
router.post('/', asyncHandler(async (req, res) => {
  if (!req.body.email || !req.body.password) {  //check all fields are present  
    res.status(400).send('Email and password required.')
  } else {
  const account = await Account.findByEmail(req.body.email)
  if (!account)   return res.sendStatus(401) //Unauthorised: Account not found 
  account.comparePassword(req.body.password, (err, isMatch) => {
     if (isMatch && !err) {
       const token = jwt.sign( { sub: account.email} , process.env.JWT_SECRET, { expiresIn: '1h' })
       res.status(200).json({access_token: 'Bearer ' + token});        // success - return JWT
     } else {
       return res.sendStatus(401) //Email-password mismatch 
     }
   })
  }
}))

export default router
