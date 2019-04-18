import mongoose from 'mongoose'
import bcrypt from  'bcrypt-nodejs'

const Schema = mongoose.Schema
const AccountSchema = new Schema({
  email: { type: String, unique: true, required: true },
  email_onclose: { type: String, unique: false, required: false},
  password: { type: String, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  mobile_number: { type: String, required: true, match: RegExp('^0[1-9][0-9]{7,15}')} ,
  switchboard_id: { type: mongoose.Types.ObjectId, required: true, ref: 'Switchboard' }
});

AccountSchema.pre('save', function(next) {
    const account = this
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, (err, salt)=> {
            if (err) return next(err)
            bcrypt.hash(account.password, salt, null, (err, hash)=> {
                if (err) return next(err)
                account.password = hash
                next()
            })
        })
    } else {
        return next()
    }
})

AccountSchema.statics.findByEmail = function(email) {
    return this.findOne({ email: email})
  }

AccountSchema.methods.comparePassword = function(passw, cb) {
    bcrypt.compare(passw, this.password, (err, isMatch) => {
        if (err) {
            return cb(err)
        }
        cb(null, isMatch)
    })
}

//custom toUser filters returned obj for req.user (used in auth)
AccountSchema.methods.toUser = function() {
    var obj = this.toObject()
    const newObj = {
        _id: obj._id,        
        email: obj.email, //used to close a/c
        switchboard_id: obj.switchboard_id 
    }
    return newObj
}

//custom toPublic filters returned obj for public api 
AccountSchema.methods.toPublic = function() {
    var obj = this.toObject()
    const newObj = {
        email: obj.email,
        first_name: obj.first_name, 
        last_name: obj.last_name,
        mobile_number: obj.mobile_number
    }
    return newObj
}


export default mongoose.model('Account', AccountSchema)