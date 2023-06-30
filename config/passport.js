const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/user.model');
module.exports = function(passport) {

  passport.use(new FacebookStrategy({
    clientID:process.env.clientID,
    clientSecret:process.env.clientSecret,
    callbackURL: "http://localhost:5000/auth/facebook/callback"
  },

 async function(accessToken, refreshToken, profile, done) {
    const user= await User.findOne({ facebookId: profile.id});
    if(user){
      return  done(null, user)
    }
    else{
        // create new User
        const newUser= new User({
          facebookId:profile.id,
            name:profile.displayName,
            email:"developer.123@gmail.com",
            image:profile.photos[0].value
        });
        const user=await newUser.save();
        return done(null, user)
    }
  }
));


passport.serializeUser(async(user, done)=>{
    
  done(null, user.id);
});

passport.deserializeUser(async(id, done) =>{

  try {
      const user = await User.findById(id);
      if(!user){
        throw new Error('User not found');
      }
      done(null, user);
   
  } catch (err){
    done(err, null);
  }
})


}
