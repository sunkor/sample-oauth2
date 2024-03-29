const express = require('express')
const passport = require('passport')
const keys = require('./config/keys')

const GoogleStrategy = require('passport-google-oauth20').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const SpotifyStrategy = require('passport-spotify').Strategy;

const app = express();

//Ask passport to use google OAuth 2.0
//google client id
//google client secret
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


//Spotify
passport.use(new SpotifyStrategy({
    clientID: keys.spotifyClientId,
    clientSecret: keys.spotifyClientSecret,
    callbackURL: '/auth/spotify/callback'
}, (accessToken, refreshToken, profile, done) => {
    console.log('Access token: ', accessToken);
    console.log('Refresh token: ', refreshToken);
    console.log('Profile: ', profile);
}));

app.get('/auth/spotify',
passport.authenticate('spotify', {
    scope: ['user-read-email']
}));

app.get('/auth/spotify/callback', passport.authenticate('spotify'))

const PORT = process.env.PORT || 5000;
app.listen(5000);