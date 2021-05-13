const express = require('express');
const passport = require('passport');
const router = express.Router();
const bcrypt = require('bcryptjs');
const uploader = require('../configs/cloudinary.config');
const Patient = require('../models/Patient.model');
const bcryptSalt = 10;

// PATIENT ROUTES

// create one

router.post('/signup', (req, res, next) => {
  const { username, name, email, password, age, activities } = req.body;

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

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    Patient.create({
      username,
      name,
      email,
      password: hashPass,
      age,
      activities,
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

router.post('/logout', (req, res, next) => {
  // req.logout is defined by passport
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