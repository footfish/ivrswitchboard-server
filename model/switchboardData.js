import Switchboard from './switchboardModel'
import mongoose from 'mongoose'

export async function newSwitchboard(number) {
  const switchboardProto = {
    _id: new mongoose.Types.ObjectId(),
    "number": number, 
    "routeOption": "scheduled",
    "schedule": {
      "openHours": {
        "mon": { "active": true, "begin": "09:00",  "end": "17:00" },
        "tue": { "active": true, "begin": "09:00",  "end": "17:00" },
        "wed": { "active": true, "begin": "09:00",  "end": "17:00" },
        "thu": { "active": true, "begin": "09:00",  "end": "17:00" },
        "fri": { "active": true, "begin": "09:00",  "end": "17:00" },
        "sat": { "active": false, "begin": "10:00",  "end": "17:00" },
        "sun": { "active": false, "begin": "10:00",  "end": "17:00" }
      },
      "lunchHours": {
        "mon": { "active": true, "begin": "13:00",  "end": "14:00" },
        "tue": { "active": true, "begin": "13:00",  "end": "14:00" },
        "wed": { "active": true, "begin": "13:00",  "end": "14:00" },
        "thu": { "active": true, "begin": "13:00",  "end": "14:00" },
        "fri": { "active": true, "begin": "13:00",  "end": "14:00" },
        "sat": { "active": false, "begin": "13:00",  "end": "14:00" },
        "sun": { "active": false, "begin": "13:00",  "end": "14:00" }
      }
    },
    "openMenu": {
      "emailNotification": true,
      "greeting": { "recordingId": 0 , "times": 1 },
      "menu": {
        "none": [
          { "action": "backToMenu" }
        ]
      },
    },
    "closedMenu": {
      "emailNotification": true,
      "greeting": { "recordingId": 0 , "times": 1 },
      "menu": {
        "none": [
            { "action": "backToMenu" }
        ]
      },
    },
    "recordings": [
      { "label": "Sample - replace this", "src": "/default_recordings/welcome.mp3" },
      { "label": "Sample - line busy", "src": "/default_recordings/line_busy.mp3" },
    ]
  }
 
  try {
      await new Switchboard(switchboardProto).save()
      return(switchboardProto._id)
     } catch (err) {
      throw `failed to store switchboard data: ${err}`
     }
}

export async function clearAllSwitchboards() {
  try {
    await Switchboard.deleteMany()
    console.log("deleted all switchboards")
    return
  } catch (err) {
    throw `failed to delete switchboard data: ${err}`
   }
}


