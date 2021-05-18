const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const diarySchema = new Schema ({
    comment: { type: String, required: true },
    patient: { type: Schema.Types.ObjectId, ref: 'Patient' },
    date: { type: Date, required: true }
})

const Diary = mongoose.model('Diary', diarySchema);
module.exports = Diary;