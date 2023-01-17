const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const UserModel = require('../../models/User.model');

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.KEY_SECRET || 'secretkey',
    },
    async (payload, done) => {
      try {
        const { data } = payload;
        const user = await UserModel.findOne({
          username: data.username,
        });
        if (!user) {
          throw new Error('User invalid!');
        }
        return done(null, user);
      } catch (error) {
        done(error, false);
      }
    },
  ),
);
