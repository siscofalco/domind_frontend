const express = require('express');
const passport = require('passport');
const router = express.Router();
const bcrypt = require('bcryptjs');
const uploader = require('../configs/cloudinary.config');
const Patient = require('../models/Patient.model');
const Doctor = require('../models/Doctor.model');
const bcryptSalt = 10;

// Sign up patient

router.post('/signup-patient', (req, res, next) => {
  const { username, name, password, birthdate, email } = req.body;

  if(password.length < 5){
    return res.status(400).json({ message: 'Please make the password at least 5 characters long'});
  }

  if(!username || !name || !password || !birthdate || !email){
    return res.status(400).json({ message: 'Please fill all the fields in the form'});
  }

  Patient.findOne({ username })
  .then(user => {
    if(user){
      return res.status(400).json({ message: 'User already exists. Please change your email'});
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    Patient.create({
      username,
      name,
      password: hashPass,
      birthdate,
      email,
      doctor: req.session.currentUser._id
    })
    .then((newPatient) => {
      Doctor.updateOne({_id: req.session.currentUser._id}, {$addToSet: {patients: newPatient._id}}, {new: true})
        .then(() => {
          return res.status(200).json(newPatient);
        })
        .catch(error => res.status(500).json(error))
    })
  })
})

// Sign up doctor

router.post('/signup-doctor', (req, res, next) => {
  const { username, name, password, mobilephone, email } = req.body;

  if(password.length < 5){
    return res.status(400).json({ message: 'Please make the password at least 5 characters long.'});
  }

  if(!username || !name || !password || !mobilephone || !email){
    return res.status(400).json({ message: 'Please fill all the fields in the form.'});
  }

  Doctor.findOne({ username })
  .then(doctor => {
    if(doctor){
      return res.status(400).json({ message: 'User already exists.'});
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    Doctor.create({
      username,
      name,
      password: hashPass,
      mobilephone,
      email
    })
    .then((newDoctor) => {
      req.login(newDoctor, (error) => {
        if(error){
          return res.status(500).json(error)
        }
        return res.status(200).json(newDoctor);
      })
    })
    .catch(error => res.status(500).json(error))
  })
})

// Patient & doctor login

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
      req.session.currentUser = theUser;
      return res.status(200).json(theUser);
    })

  })(req, res, next)
})

// Patient & doctor logout

router.post('/logout', (req, res, next) => {
  req.logout();
  return res.status(200).json({ message: 'Log out success!'});
})

router.put('/edit', uploader.single('photo'), (req, res, next) => {
  console.log(req.file);
  Patient.findOneAndUpdate({ _id: req.user.id }, { new: true })
  .then(user => res.status(200).json(user))
  .catch(error => res.status(500).json(error))
})

router.get('/loggedin', (req, res, next) => {
  // req.isAuthenticated & req.user are defined by passport
  if(req.isAuthenticated()){
    return res.status(200).json(req.user);
  } else {
    return res.status(403).json({ message: 'Forbbiden' });
  }
})

module.exports = router;