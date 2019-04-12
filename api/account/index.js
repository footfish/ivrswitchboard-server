import express from 'express'
import Account from './accountModel'
import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'

const router = express.Router()

// Create/Login account 
router.post('/', asyncHandler(async (req, res) => {
 if (!req.body.email || !req.body.password) {  //check all fields are present  
   res.status(400).send('Email and password required.')
 }

 if (req.query.action === 'create') { // Process account creation attempt 
    const newUser = new Account({
      email: req.body.email,
      password: req.body.password,
     }) 
    //note: need to add switchboard creation here  
    await newUser.save() 
    res.status(201).send('Created new account')
 } else {                             // Process account login attempt 
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
