const express = require('express');
const passport = require('passport');
const router = express.Router();
const Patient = require('../models/Patient.model');
const bcrypt = require('bcryptjs');

const bcryptSalt = 10;
const salt = bcrypt.genSaltSync(bcryptSalt);
const hashPass = bcrypt.hashSync(password, salt);

// create one

router.post('/signup', (req, res, next) => {
    const { username, name, password, age, email } = req.body;

    if(password.length < 6){
        return res.status(400).json({ message: 'Please make the password at least 6 characters long'});
    }

    if(!username || !email){
        return res.status(400).json({ message: 'Please fill all the fields in the form'});
    }

    Patient.findOne({ email })
        .then(user => {
            if(user){
                return res.status(400).json({ message: 'User already exists. Please change your email'});
            }

            Patient.create({
                username,
                name,
                password: hashPass,
                age,
                email
            })
            .then((newUser) => {
                // Passport req.login permite iniciar sesión tras crear el usuario
                req.login(newUser, (error) => {
                if(error){
                return res.status(500).json(error)
                }

                return res.status(200).json(newUser);
                })
            })
            .catch(error => res.status(500).json(error))
    })
})
  
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
    Patient.findOneAndUpdate({ _id: req.user.id }, { new: true })
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

// Show all

router.get('/', (req, res, next) => {
    Patient.find()
    .then(data => res.status(200).json(data))
    .catch(error => res.status(500).json(error))
})

module.exports = router;

// show profile

router.get('/:id', (req, res, next) => {
    const { id } = req.params;
    Patient.findOne({ _id: id })
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