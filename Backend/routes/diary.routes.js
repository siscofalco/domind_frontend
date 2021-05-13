const express = require('express');
const router = express.Router();
const Diary = require('../models/Diary.model');
const Patient = require('../models/Patient.model');

// create Diary

router.post('/create', (req, res, next) => {
    const { comment, patient } = req.body;

    Diary.create({comment, patient})
        .then((newDiary) => {
            Patient.updateOne({_id: patient}, {$addToSet: {diary: newDiary._id}}, {new: true})
            .then(() => {
                return res.status(200).json(newDiary)
            })
            .catch(error => res.status(500).json(error))
        })
        .catch(error => res.status(500).json(error))
})

// delete Diary

router.delete('/:id', (req, res, next) => {
    const { id } = req.params;
    Diary.deleteOne({ _id: id })
    .then((diary) => {
        Patient.updateOne(diary.patient, { $pull: { diary: id } })
        .then(() => {
            return res.status(200).json({message: "Diary deleted"});
        })
    })
})

// See Diary

router.get('/:id', (req, res, next) => {
    const { id } = req.params;
    Diary.findOne({ _id: id })
    .then(data => res.status(200).json(data))
    .catch(error => res.status(500).json(error))
})

module.exports = router;