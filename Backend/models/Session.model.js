const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sessionSchema = new Schema ({
    comment: { type: String, required: true },
    patient: { type: Schema.Types.ObjectId, ref: 'Patient' },
    date: { type: Date, required: true }
})

const Session = mongoose.model('Session', sessionSchema);
module.exports = Session;