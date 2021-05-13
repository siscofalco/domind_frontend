const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor.model');

// edit

router.put('/edit', (req, res, next) => {
    Doctor.findOneAndUpdate({ _id: req.session.currentUser._id }, req.body, {new: true})
    .then(user => res.status(200).json(user))
    .catch(error => res.status(500).json(error))
})

// show profile

router.get('/:id', (req, res, next) => {
    const { id } = req.params;
    Doctor.findOne({ _id: id })
    .then(data => res.status(200).json(data))
    .catch(error => res.status(500).json(error))
})

// delete one

router.delete('/:id', (req, res, next) => {
    const { id } = req.params;
    Doctor.findOneAndRemove({ _id: id })
    .then(() => res.status(200).json({message: "Doctor deleted"}))
    .catch(error => res.status(500).json(error))
})

module.exports = router;