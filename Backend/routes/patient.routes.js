const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient.model');
const Doctor = require('../models/Doctor.model');
const Activity = require('../models/Activity.model');
const Session = require('../models/Session.model');
const Diary = require('../models/Diary.model');

// edit

router.put('/edit/:id', (req, res, next) => {
    Patient.findOneAndUpdate({ _id: req.params.id, doctor: req.session.currentUser._id }, req.body, { new: true })
    .then(user => res.status(200).json(user))
    .catch(error => res.status(500).json(error))
})

// Show all

router.get('/', (req, res, next) => {
    Patient.find({ doctor: req.session.currentUser._id })
    .then(data => res.status(200).json(data))
    .catch(error => res.status(500).json(error))
})

module.exports = router;

// show profile

router.get('/:id', (req, res, next) => {
    const { id } = req.params;
    Patient.findOne({ _id: id, doctor: req.session.currentUser._id }).populate('activities')
    .then(data => res.status(200).json(data))
    .catch(error => res.status(500).json(error))
})

// delete one

router.delete('/:id', (req, res, next) => {
    const { id } = req.params;
    Patient.deleteOne({ _id: id })
    .then((patient) => {
        Doctor.updateOne({_id: patient.doctor}, { $pull: { patients: id } })
        .then(() => {
            Activity.deleteMany({patient: patient._id})
            .then(() => {
                Session.deleteMany({patient: patient._id})
                .then(() => {
                    Diary.deleteMany({patient: patient._id})
                    .then(() => {
                        return res.status(200).json({message: "Patient deleted"});
                    })
                    .catch(error => res.status(500).json(error))
                })
                .catch(error => res.status(500).json(error))
            })
            .catch(error => res.status(500).json(error))
        })
        .catch(error => res.status(500).json(error))
    })
    .catch(error => res.status(500).json(error))
})

module.exports = router;