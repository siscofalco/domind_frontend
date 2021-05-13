const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient.model');

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
    Patient.findOne({ _id: id, doctor: req.session.currentUser._id })
    .then(data => res.status(200).json(data))
    .catch(error => res.status(500).json(error))
})

// delete one

router.delete('/:id', (req, res, next) => {
    const { id } = req.params;
    Patient.findOneAndRemove({ _id: id })
    .then(() => res.status(200).json({message: "Patient deleted"}))
    .catch(error => res.status(500).json(error))
})

module.exports = router;