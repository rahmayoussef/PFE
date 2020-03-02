const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const Membre = mongoose.model('membres');
const keys = require('../config/keys');



const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey


module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
            //  console.log(jwt_payload);
            Membre.findById(jwt_payload.id)
               .then(membre => {
                   if(membre){
                       return done(null, membre);
                   }
                       return done(null, false);
               })
               .catch(err => console.log(err));
        })
    );
};
