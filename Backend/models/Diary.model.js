const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const diarySchema = new Schema ({
    comment: { type: String, required: true },
    patient: [{ type: Schema.Types.ObjectId, ref: 'Patient' }]
})

const Diary = mongoose.model('Session', diarySchema);
module.exports = Diary;