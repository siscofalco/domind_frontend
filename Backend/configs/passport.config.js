const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Patient = require('../models/Patient.model');
const Doctor = require('../models/Doctor.model');
const bcrypt = require('bcryptjs');

module.exports = (app) => {
  // Identificará a un usuario con una sesión (Asignará a la sesión el id del usuario)
  passport.serializeUser((user, cb) => { cb(null, user.id )});

  // Identificará a qué usuario pertenece la sesión
  passport.deserializeUser((id, cb) => {
    Patient.findById(id)
    .then((user) => {
      if(user){
        return cb(null, user);
      } else {
        Doctor.findById(id)
        .then((doctor) => {
          return cb(null, doctor);
        })
        .catch(error => cb(error))
      }
    })
    .catch(error => cb(error))
  }); 

  // Local Strategy
  passport.use(new LocalStrategy({ passReqToCallback: true }, (req, username, password, next) => {
    Patient.findOne({ username })
    .then(user => {
      if(!user){
        Doctor.findOne({ username })
        .then((doctor) => {
          if(!doctor){
            return next(null, false, { message: 'Incorrect username or password.'});
          } else {
            if(bcrypt.compareSync(password, doctor.password)){
              return next(null, doctor);
            } else {
              return next(null, false, { message: 'Incorrect username or password.'});
            }
          }
        })
        .catch((error) => next(error))
      } else {
        if(bcrypt.compareSync(password, user.password)){
          return next(null, user);
        } else {
          return next(null, false, { message: 'Usuario o contraseña incorrectos'});
        }
      }
    }) 
    .catch((error) => next(error))
  }))

  app.use(passport.initialize());
  app.use(passport.session());

}