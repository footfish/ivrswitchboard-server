import Account from './accountModel'
import mongoose from 'mongoose'

const accountData = [{
        'email': 'dummy1@email.com',
        'password': 'dummy1',
        "switchboard_id" : mongoose.Types.ObjectId.createFromHexString("5cae015a43d39288f07583f5"),
    }
];


export default async function loadAccounts() {

    try {
        await Account.deleteMany()
        new Account(accountData[0]).save()
        console.info(`${accountData.length} accounts were successfully stored.`)
    } catch (err) {
        console.error(`failed to Load account Data: ${err}`)
    }
}