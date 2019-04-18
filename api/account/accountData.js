import Account from './accountModel'


export async function clearAllAccounts() {
    try {
      await Account.deleteMany()
      console.log("deleted all accounts")
      return
    } catch (err) {
      throw `failed to delete account data: ${err}`
     }
  }
  

export async function newAccount(email, password, first_name, last_name, mobile_number, switchboard_id) {
    const accountProto = {
        'email': email,
        'password': password,
        'first_name': first_name,
        'last_name' : last_name ,
        'mobile_number': mobile_number,
        'switchboard_id' : switchboard_id
    }

    try {
        await new Account(accountProto).save()
        return
    } catch (err) {
        throw(`failed to store account Data: ${err}`)
    }
}