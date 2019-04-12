//middleware stack to extract email address from JWT in Authorization header and verify it belongs to a valid user. 
import passport from 'passport'
import passportJWT from 'passport-jwt'
import Account from './../api/account/accountModel'
import dotenv from 'dotenv'

dotenv.config()

let jwtOptions = {}
jwtOptions.jwtFromRequest = passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken()
jwtOptions.secretOrKey = process.env.JWT_SECRET

passport.use(new passportJWT.Strategy(jwtOptions, 
    async function(payload, next) {
        const account = await Account.findByEmail(payload.email)
        if (account) next(null, account.toUser()) //authenticated - pass account object to next middleware in req.user
        else next(null, false)  //failed authentication 
    }))

export default passport