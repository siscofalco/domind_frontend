const express = require('express');
const Patient = require('../models/Patient.model');
const Doctor = require('../models/Doctor.model');
const router = express.Router();

// PATIENT ROUTES

// Show all

router.get('/', (req, res, next) => {
    Patient.find()
    .then(data => res.status(200).json(data))
    .catch(error => res.status(500).json(error))
})

// show details

router.get('/:id', (req, res, next) => {
    const { id } = req.params;
    Patient.findOne({ _id: id })
    .then(data => res.status(200).json(data))
    .catch(error => res.status(500).json(error))
})

// create one

router.post('/', (req, res, next) => {
    const { name, password } = req.body;
    if(!name){
        return res.status(400).json({ message: "Name is required"});
    }
    Patient.create({name, password})
    .then(data => res.status(200).json(data))
    .catch(error => res.status(500).json(error))
})

// update one

// Line 40 (req.body to "obtain" just the information that is given to us, for example only password, only name, etc)

router.put('/:id', (req, res, next) => {
    const { id } = req.params;
    Patient.findOneAndUpdate({ _id: id }, req.body, {new : true })
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

// DOCTOR ROUTES

//profile

router.get('/:id', (req, res, next) => {
    const { id } = req.params;
    Doctor.findOne({ _id: id })
    .then(data => res.status(200).json(data))
    .catch(error => res.status(500).json(error))
})

module.exports = router;
