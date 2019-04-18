import mongoose from 'mongoose'

const Schema = mongoose.Schema
const E164Schema = new Schema({
  cc:  { type: String, unique: false, required: true, match:RegExp('^[1-9][0-9]{0,2}$') }, //country code 
  ndc:  { type: String, unique: false, required: true, match:RegExp('^[1-9][0-9]{0,4}$') }, //national destination code  (national prefix)
  number: { type: String, unique: false, required: true, match:RegExp('^[1-9][0-9]{11,14}') },
  used: { type: Boolean, unique: false, default: false, required: true},
  used_date: { type: Date, unique: false,  required: false},
  client_id : Number
});


E164Schema.statics.findRandom20 = function(cc, ndc) {
    return this.aggregate([
        {$match:{ cc: cc, ndc: ndc, used: {$eq: false}}},
        {$project:{ '_id': 0, 'number' :1}}
      ]).sample(20)
  }


export default mongoose.model('E164', E164Schema)