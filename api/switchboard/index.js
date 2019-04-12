import express from 'express'
import _ from 'lodash'
import asyncHandler from 'express-async-handler'
import Switchboard from './switchboardModel'


const router = express.Router()

router.get('/',  asyncHandler(async(req, res) => {
  try{
    const switchboard = await Switchboard.findById(req.user.switchboard_id) //switchboard_id from auth result
    if (switchboard) return res.status(200).json(switchboard)
    else return res.sendStatus(404)
  } catch (error) {
    return res.status(400).send(error.message)
  }
}))


router.patch('/', asyncHandler(async(req, res) => {
  try{
      const switchboard = await Switchboard.findOneAndUpdate({ _id: req.user.switchboard_id }, req.body, {new: true, runValidators: true})
      if (switchboard)  res.status(200).json(switchboard)
      else return res.sendStatus(404)
  } catch (error) {
      return res.status(400).send(error.message)
  }

}))


export default router