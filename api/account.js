import express from 'express'
import Account from '../model/accountModel'


const router = express.Router()

//get account details (model filtered with .toPublic())
router.get('/',  async(req, res) => {
  try{
    const account = await Account.findById(req.user._id) //_id from auth result
    if (account) return res.status(200).json(account.toPublic())
    else return res.sendStatus(404)
  } catch (error) {
    return res.status(400).send(error.message)
  }
})

//close account (email rename which expires JWT)
router.delete('/',  async(req, res) => {
  try{
    const result = await Account.updateOne({ _id: req.user._id }, {email: 'CLOSED@'+Date.now(), email_onclose: req.user.email} )
    if (result.n === 1) return res.sendStatus(200)
    else return res.sendStatus(404)
  } catch (error) {
    return res.status(400).send(error.message)
  }
})

export default router
