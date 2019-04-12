import mongoose from 'mongoose'
import bcrypt from  'bcrypt-nodejs'

const Schema = mongoose.Schema
const AccountSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
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
    delete obj.password //remove password
    delete obj.__v //remove versioning    
    return obj
}

export default mongoose.model('Account', AccountSchema)