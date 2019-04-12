import Account from './accountModel'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()


const accountData = [{
        'email': 'dummy1@email.com',
        'password': 'dummy1',
        "switchboard_id" : mongoose.Types.ObjectId.createFromHexString(process.env.SWITCHBOARD_ID),
    },
    {
        'email': 'dummy2@email.com',
        'password': 'dummy2',
        "switchboard_id" : mongoose.Types.ObjectId.createFromHexString(process.env.SWITCHBOARD_ID),
    },
];


export default async function loadAccounts() {

    try {
        await Account.deleteMany()
        new Account(accountData[0]).save()
        new Account(accountData[1]).save()
        console.info(`${accountData.length} accounts were successfully stored.`)
    } catch (err) {
        console.error(`failed to Load account Data: ${err}`)
    }
}