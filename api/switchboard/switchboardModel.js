import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const hoursSchema = new Schema({
    active: {type: Boolean, required: true, default: true},
    begin:  {type: String, required: true, default: "09:00", match:/^[0-2][0-9]:[0-5][0-9]+$/},    
    end:  {type: String, required: true, default: "17:00", match:/^[0-2][0-9]:[0-5][0-9]+$/}
    },{ _id : false })


const MenuSectionActionSchema = new Schema({
    action: {type: String, 
              required: true, 
              enum:["voicemailToEmail", "notifyEmail", "forwardToNumber", "forwardToNumberWhisper", "forwardToNumberConfirm", "analytics", "backToMenu", "playRecording"]
            },
    email: {type: String, match: RegExp('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$') },
    label: {type: String, match: RegExp('^[a-zA-Z0-9_-]{1,50}$')},
    number: {type: String, match: RegExp('^0[1-9][0-9]{7,15}')},
    ringTimer: {type: Number, min: 5, max: 300},
    recordingId: {type: Number, min: 0, max: 30},
  },{ _id : false })

  const menuSchema = new Schema({
    none: { type: [MenuSectionActionSchema], default: undefined },
    1: { type: [MenuSectionActionSchema], default: undefined },
    2: { type: [MenuSectionActionSchema], default: undefined },
    3: { type: [MenuSectionActionSchema], default: undefined },
    4: { type: [MenuSectionActionSchema], default: undefined },
    5: { type: [MenuSectionActionSchema], default: undefined },
    6: { type: [MenuSectionActionSchema], default: undefined },
    7: { type: [MenuSectionActionSchema], default: undefined },
    8: { type: [MenuSectionActionSchema], default: undefined },
    9: { type: [MenuSectionActionSchema], default: undefined },
    10: { type: [MenuSectionActionSchema], default: undefined },
    11: { type: [MenuSectionActionSchema], default: undefined }   
},{ _id : false })


  const SwitchboardSchema = new Schema({
    _id        : mongoose.Types.ObjectId,
    number: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 16
    },
    routeOption: {
        type: String, 
        enum: ["scheduled", "alwayOpen", "alwaysClosed"],
        required: true,
        default: "scheduled"
    },
    schedule: {        
        openHours: {
            mon: hoursSchema,
            tue: hoursSchema,
            wed: hoursSchema,
            thu: hoursSchema,
            fri: hoursSchema,
            sat: hoursSchema,
            sun: hoursSchema
        },
        lunchHours: {
            mon: hoursSchema,
            tue: hoursSchema,
            wed: hoursSchema,
            thu: hoursSchema,
            fri: hoursSchema,
            sat: hoursSchema,
            sun: hoursSchema
        }
    },
    openMenu: {
        emailNotification:  {type: Boolean, required: true, default: true},
        greeting: {
            recordingId: {type: String, required: true, default: "0"},
            times: {type: Number, required: true, default: 3},
            },
        menu: menuSchema
        },
        closedMenu: {
            emailNotification:  {type: Boolean, required: true, default: false},
            greeting: {
                recordingId: {type: String, required: true, default: "0"},
                times: {type: Number, required: true, default: 3},
            },
            menu: menuSchema
        },
            recordings: [{ label: String, src: String }]            
            }
)
  
//custom toJSON filters returned Json 
SwitchboardSchema.methods.toJSON = function() {
    var obj = this.toObject()
    delete obj._id //remove _id 
    delete obj.__v //remove versioning    
    return {switchboard: obj} //wrap in switchboard object 
   }

export default mongoose.model('Switchboard', SwitchboardSchema);