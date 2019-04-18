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