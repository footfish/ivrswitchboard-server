import express from 'express'
import {switchboard} from './switchboard'

const router = express.Router()
router.get('/', (req, res) => {
  res.send({switchboard: switchboard});
});

export default router;