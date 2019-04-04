import express from 'express'
import _ from 'lodash'
import {switchboard} from './switchboard'

const router = express.Router()
router.get('/', (req, res) => {
  res.send({switchboard: switchboard})
})


router.get('/:id', (req, res) => {
  const id = req.params.id
  const result = switchboard.find( obj => obj.id === id)
  if (typeof result !== 'undefined') {
    res.send({switchboard: result})
  } else {
    res.status(404).send({message: 'Not found'});
  }
})

router.patch('/:id', (req, res) => {
  console.log("patch")
  const id = req.params.id
  const idx = switchboard.findIndex ( obj => obj.id === id)
  if (idx !== -1 )
    {
    _.merge(switchboard[idx],req.body) // need schema checks !!
    res.send({switchboard: switchboard[idx]})
    }
  else 
    {
    res.status(404).send({message: 'Not found'});
    }

})


export default router