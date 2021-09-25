const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
    scheduleEvent: {
        type:String,
        required: true,
    },
    eventTime: {
        type:String,
        required: true,
    }
})

const Schedule = mongoose.model("Schedule", scheduleSchema);
module.exports = Schedule;