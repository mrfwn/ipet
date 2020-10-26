const express = require('express');
const passport = require('passport');
const axios = require('axios');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

require('dotenv/config');

const GooleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const InstagramStrategy = require('passport-instagram').Strategy;

const chalk = require('chalk');

// eslint-disable-next-line no-unused-vars
let user = {};

// eslint-disable-next-line no-shadow
passport.serializeUser((user, cb) => {
  cb(null, user);
});

// eslint-disable-next-line no-shadow
passport.deserializeUser((user, cb) => {
  cb(null, user);
});

passport.use(
  new GooleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
      proxy: true,
    },
    (accessToken, refreshToken, profile, cb) => {
      console.log(chalk.blue(JSON.stringify(profile)));
      user = { ...profile };
      user.accessToken = accessToken;
      user.refreshToken = refreshToken;
      return cb(null, profile);
    }
  )
);

// for facebaook
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: '/auth/facebook/callback',
      proxy: true,
    },
    (accessToken, refreshToken, profile, cb) => {
      console.log(chalk.blue(JSON.stringify(profile)));
      user = { ...profile };
      return cb(null, profile);
    }
  )
);

// for instagram
passport.use(
  new InstagramStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: '/auth/instagram/callback',
      proxy: true,
    },
    (accessToken, refreshToken, profile, cb) => {
      console.log(chalk.blue(JSON.stringify(profile)));
      user = { ...profile };
      return cb(null, profile);
    }
  )
);

// ########## GOOGLE ###########
app.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: [
      'https://www.googleapis.com/auth/photoslibrary.readonly',
      'profile',
      'email',
    ],
  })
);
app.get(
  '/auth/google/callback',
  passport.authenticate('google'),
  (req, res) => {
    res.redirect('/home');
  }
);

// ######### FACEBOOK #############
app.get('/auth/facebook', passport.authenticate('facebook'));
app.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook'),
  (req, res) => {
    res.redirect('/home');
  }
);

// ######## INSTAGRAM ##################
app.get('/auth/instagram', passport.authenticate('instagram'));
app.get(
  '/auth/instagram/callback',
  passport.authenticate('instagram'),
  (req, res) => {
    res.redirect('/home');
  }
);

app.get('/user', (req, res) => {
  console.log('getting user data!');
  res.send(user);
});

app.get('/auth/logout', (req, res) => {
  console.log('logging out!');
  user = {};
  res.redirect('/');
});
app.listen(3333, () => {
  console.log('server running on 3333 💻🐶');
});
