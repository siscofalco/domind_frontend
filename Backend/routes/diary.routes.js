const express = require('express');
const router = express.Router();
const Diary = require('../models/Diary.model');

// create Diary

router.post('/create', (req, res, next) => {
    const { comment } = req.body;

    Diary.create({
        comment
        })
        .then((newDiary) => {
            return res.status(200).json(newDiary);
        })
        .catch(error => res.status(500).json(error))
})

// delete Diary

router.delete('/:id', (req, res, next) => {
    const { id } = req.params;
    Diary.findOneAndRemove({ _id: id })
    .then(() => res.status(200).json({message: "Diary deleted"}))
    .catch(error => res.status(500).json(error))
})

// See Diary

router.get('/:id', (req, res, next) => {
    const { id } = req.params;
    Diary.findOne({ _id: id })
    .then(data => res.status(200).json(data))
    .catch(error => res.status(500).json(error))
})

module.exports = router;