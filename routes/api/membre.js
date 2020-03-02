const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport'); 


// Load Input Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

//Load Membre Model
const Membre = require('../../models/Membre');


// @route   GET api/membre/test
// @desc    Tests membre route
// @access  Public
router.get('/test', (req,res) => {
    res.json({msg: 'Membres works'})
})



// @route   POST api/membre/register
// @desc    Register membre
// @access  Public
router.post('/register', (req, res) => {
    
    const { errors, isValid } = validateRegisterInput(req.body);

    // Check Validation
    if(!isValid){
        return res.status(400).json(errors);
    }

    Membre.findOne({ email: req.body.email }).then(membre => {
            if(membre){
                errors.email = "Email already exists"
                return res.status(400).json(errors);
            } else {
                const avatar =  gravatar.url(req.body.email, {
                    s: '200', //Size
                    r: 'pg', //Rating
                    d:'mm' //Default
                })
                const newMembre = new Membre({
                    name: req.body.name,
                    email: req.body.email,
                    avatar,
                    password: req.body.password
                });

                bcrypt.genSalt(10, (err, salt) => {
                     bcrypt.hash(newMembre.password, salt, (err, hash) => {
                         if(err) throw err;
                         newMembre.password = hash;
                         newMembre.save()
                            .then(membre => res.json(membre))
                            .catch(err => console.log(err))
                     })
                })
            }
        })
});


// @route GET api/membre/login
// @desc  Login Membre / Returning JWT Token
// @access Public 
router.post('/login', (req, res) => {

    const { errors, isValid} = validateLoginInput(req.body);

    // check validation
     if(!isValid){
         return res.status(400).json(errors);
     }

const email = req.body.email;
const password = req.body.password;

//Find your membre by email
Membre.findOne({email})
       .then(membre => {
           // Check for membre
           if(!membre){

            errors.email= 'User not found' ;
               return res.status(400).json(errors);
           }
           // Check Password
           bcrypt.compare(password, membre.password)
              .then(isMatch => {
                  if(isMatch) {
                  // cas1 : sans untilisation de jwt res.json({ msg: 'Success' });
                 
                  // Membre Matched
                  const payload = { id: membre.id,
                                    name: membre.name, 
                                    avatar: membre.avatar}

                  // Sign Token
                   jwt.sign(payload,
                            keys.secretOrKey,
                            { expiresIn: 3600 } ,
                             (err, token) => {
                                 res.json({
                                     success: true,
                                     token: 'Bearer ' +token
                                 })
                   });

                  }else{
                      errors.password = 'Password incorrect';
                      return res.status(400).json(errors);
                  }
              })
       })

})

// @route GET api/membre/current
// @desc  Return current membre
// @access Private 
router.get('/current',
           passport.authenticate('jwt', { session: false }), 
           (req, res) => {
                 res.json(req.membre); 
          });

module.exports = router;

