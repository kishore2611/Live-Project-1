const Contact = require("../Models/contactModel")
const moment = require("moment")

const scheduleUnblock = async () => {
    const curr = new Date()
    console.log(moment(curr).format("YYYY-MM-DDTHH:mm"))
    await Contact.updateMany({ un_block_at: { $lte: moment(curr).format("YYYY-MM-DDTHH:mm") } }, { $set: { is_block: 0, blocking_days: null, blocking_hours: null, un_block_at: null } })
}
module.exports = { scheduleUnblock } 
