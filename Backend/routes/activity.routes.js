const express = require('express');
const router = express.Router();
const Activity = require('../models/Activity.model');
const Patient = require('../models/Patient.model');

// create activity

router.post('/create', (req, res, next) => {
    const { questions, image, patient } = req.body;

    Activity.create({
        date : Date.now(),
        questions,
        image,
        patient,
    })
    .then((newActivity) => {
        Patient.updateOne({_id: patient}, {$addToSet: {activities: newActivity._id}}, {new: true})
        .then(() => {
            return res.status(200).json(newActivity)
        })
        .catch(error => res.status(500).json(error))
    })
    .catch(error => res.status(500).json(error))
})

// delete activity

router.delete('/:id', (req, res, next) => {
    const { id } = req.params;
    Activity.deleteOne({ _id: id })
    .then((activity) => {
        Patient.updateOne(activity.patient, { $pull: { activities: id } })
        .then(() => {
            return res.status(200).json({message: "Activity deleted"});
        })
    })
    .catch(error => res.status(500).json(error))
})

// See activity

router.get('/:id', (req, res, next) => {
    const { id } = req.params;
    Activity.findOne({ _id: id })
    .then(data => res.status(200).json(data))
    .catch(error => res.status(500).json(error))
})

// Update activity

router.put('/edit/:id', (req, res, next) => {
    const { id } = req.params;
    Activity.findOneAndUpdate({ _id: id }, req.body, { new: true })
    .then(user => res.status(200).json(user))
    .catch(error => res.status(500).json(error))
})

module.exports = router;