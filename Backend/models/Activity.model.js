const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const activitySchema = new Schema ({
    date: { type: Date, required: true },
    questions: [{ type: String, required: true }],
    answers: [{ type: String }],
    image: { type: String },
    patient: { type: Schema.Types.ObjectId, ref: 'Patient' }
})

const Activity = mongoose.model('Activity', activitySchema);
module.exports = Activity;