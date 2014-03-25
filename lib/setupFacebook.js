'use strict';
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('./schemas.js').User;
var config = require('../config.json');

// function createFacebookPhotoUrl(facebookId) {
//     return 'https://graph.facebook.com/' + facebookId + '/picture';
// }


module.exports = function(app) {
    // routes:
    app.get('/auth/facebook', passport.authenticate('facebook', {
        scope: 'email'
    }));

    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        failureRedirect: '/',
        successRedirect: '/home'
    }));

    // passport stuff
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            if (err) {
                done(err);
            }
            if (user) {
                done(null, user);
            }
        });
    });

    passport.use(new FacebookStrategy({
            clientID: config.social.facebook.appId,
            clientSecret: config.social.facebook.appSecret,
            callbackURL: '/auth/facebook/callback',
            profileFields: ['id', 'displayName', 'photos', 'emails', 'username', 'name']
        },
        function(accessToken, refreshToken, profile, done) {
            User.findOne({
                email: profile.emails[0].value
            }, function(err, user) {
                if (user) {
                    done(null, user);
                }
                else {
                    new User({
                        'username': '',
                        'email': profile.emails[0].value,
                        'realName': profile.displayName,
                        'facebookId': profile.id,
                        joinDate: new Date()
                    }).save(function(err, newUser) {
                        done(null, newUser);
                    });
                }
            });
        }));
};
