import e164Model from './e164Model'


export async function loadE164s() {
var e164s = []
for(let i = 100; i < 200; i++){
    e164s.push({ cc:"353", ndc:"818", number:"123"+i, used: false});
}
    try {
      await e164Model.deleteMany()
      await e164Model.collection.insertMany(e164s)
      console.info(`${e164s.length} numbers were successfully stored.`)
    } catch (err) {
      console.error(`failed to Load e164 number Data: ${err}`)
    }
  }

export async function markE164Used(e164Used) {
  try {
    const e164found = await e164Model.findOne(e164Used)
    if (e164found.used) throw ('164 number already used')
    await e164Model.findByIdAndUpdate(e164found._id, {used: true})
    return 
  } catch (err) {
    throw(`failed to reserve e164 number: ${err}`)
  }
}
