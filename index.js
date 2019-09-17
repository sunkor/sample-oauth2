const express = require('express')
const passport = require('passport')
const keys = require('./config/keys')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const app = express();

//Ask passport to use google OAuth 2.0
//google client id - 831807137507-lbjq9ft5hrdh4tsj03jgtocilbqqvasb.apps.googleusercontent.com
//google client secret - 1Lva9ewLbug1EGeEykZFUJ9J
passport.use(new GoogleStrategy({
    clientID: keys.googleClientId,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    console.log('Access token: ', accessToken);
    console.log('Refresh token: ', refreshToken);
    console.log('Profile: ', profile);
}));

app.get('/auth/google',
passport.authenticate('google', {
    scope: ['profile', 'email']
}));

app.get('/auth/google/callback', passport.authenticate('google'))

//Facebook
passport.use(new FacebookStrategy({
    clientID: keys.facebookClientId,
    clientSecret: keys.facebookClientSecret,
    callbackURL: '/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'photos', 'email']
}, (accessToken, refreshToken, profile, done) => {
    console.log('Access token: ', accessToken);
    console.log('Refresh token: ', refreshToken);
    console.log('Profile: ', profile);
}));

app.get('/auth/facebook',
passport.authenticate('facebook', {
    scope: ['email']
}));

app.get('/auth/facebook/callback', passport.authenticate('facebook'))


const PORT = process.env.PORT || 5000;
app.listen(5000);