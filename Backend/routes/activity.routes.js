const express = require('express');
const router = express.Router();
const Activity = require('../models/Activity.model');

// create activity

router.post('/create', (req, res, next) => {
    const { date, questions, answers, image } = req.body;

    Activity.create({
        date : Date.now(),
        questions,
        answers,
        image,
        })
        .then((newActivity) => {
            return res.status(200).json(newActivity);
        })
        .catch(error => res.status(500).json(error))
})

// delete activity

router.delete('/:id', (req, res, next) => {
    const { id } = req.params;
    Activity.findOneAndRemove({ _id: id })
    .then(() => res.status(200).json({message: "Activity deleted"}))
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

router.put('/edit', uploader.single('photo'), (req, res, next) => {
    Activity.findOneAndUpdate({ _id: id }, { new: true })
    .then(user => res.status(200).json(user))
    .catch(error => res.status(500).json(error))
})

module.exports = router;