const express = require('express');
const passport = require('passport');
const router = express.Router();
const Doctor = require('../models/Doctor.model');
const bcrypt = require('bcryptjs');

const bcryptSalt = 10;
const salt = bcrypt.genSaltSync(bcryptSalt);
const hashPass = bcrypt.hashSync(password, salt);

// Log In

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (error, theUser, failureDetails) => {
        if(error){
            return res.status(500).json(error);
        }

        if(!theUser){
            return res.status(401).json(failureDetails);
        }

        req.login(theUser, (error) => {
            if(error){
                return res.status(500).json(error);
            }

            return res.status(200).json(theUser);
        })

    })(req, res, next)
})
  
// log out

router.post('/logout', (req, res, next) => {
    // req.logout is defined by passport
    req.logout();
    return res.status(200).json({ message: 'Log out success!'});
})

// edit

router.put('/edit', uploader.single('photo'), (req, res, next) => {
    Doctor.findOneAndUpdate({ _id: req.user.id }, { new: true })
    .then(user => res.status(200).json(user))
    .catch(error => res.status(500).json(error))
})

// isLoggedIn

router.get('/loggedin', (req, res, next) => {
    // req.isAuthenticated & req.user are defined by passport
    if(req.isAuthenticated()){
        return res.status(200).json(req.user);
    } else {
        return res.status(403).json({ message: 'Forbbiden' });
    }
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