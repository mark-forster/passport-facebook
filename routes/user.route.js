const express= require('express');
const router= express.Router();
const userController= require('../controllers/user.controller')
const passport= require('passport')
router.get('/', userController.getIndex);


router.get('/facebook',
  passport.authenticate('facebook'));

router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/dashboard');
  });


module.exports= router;