const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patientSchema = new Schema({
  username: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  birthdate: { type: Date, required: true},
  email: {
    type: String,
    unique: true, 
    lowercase: true,
    trim: true,
    required: true,
    match: [/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/]
  },
  activities: [{ type: Schema.Types.ObjectId, ref: 'Activity'}],
  doctor: { type: Schema.Types.ObjectId, ref: 'Doctor', required: true },
  diary: [{ type: Schema.Types.ObjectId, ref: 'Diary' }],
  sessions: [{ type: Schema.Types.ObjectId, ref: 'Session' }],
})

const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;

// {
//   timestamps: true,
//   toJSON: {
//     transform: (doc, ret) => {
//       ret.id = doc._id;
//       delete ret._id;
//       delete ret.__v;
//       delete ret.password;

//       return ret;
//     }
//   }