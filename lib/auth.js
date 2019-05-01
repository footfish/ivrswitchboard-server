//middleware stack to extract email address from JWT in Authorization header and verify it belongs to a valid user. 
import passport from 'passport'
import passportJWT from 'passport-jwt'
import Account from '../model/accountModel'
import dotenv from 'dotenv'

dotenv.config()

//jwt from auth header or query string (for recordings)
let jwtOptions = {}
jwtOptions.jwtFromRequest = passportJWT.ExtractJwt.fromExtractors([passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),passportJWT.ExtractJwt.fromUrlQueryParameter('auth_token')])
jwtOptions.secretOrKey = process.env.JWT_SECRET

passport.use(new passportJWT.Strategy(jwtOptions, 
    async function(payload, next) {
        const account = await Account.findByEmail(payload.sub)
        if (account) next(null, account.toUser()) //authenticated - pass account object to next middleware in req.user
        else next(null, false)  //failed authentication 
    }))

export default passport