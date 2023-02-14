const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const GooglePlusTokenStrategy = require('passport-google-plus-token');
const { UserModel, UserInfoModel } = require('../../databases/models');

// JWT
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.KEY_SECRET,
    },
    async (payload, done) => {
      try {
        console.log(payload);
        const { username } = payload.data;

        const user = await UserModel.findOne({
          where: {
            username,
          },
        });
        if (!user) return done('Invalid user', false);

        return done(null, user);
      } catch (error) {
        done(error, false);
      }
    },
  ),
);

// Google+
passport.use(
  new GooglePlusTokenStrategy(
    {
      clientID: '727067276936-mb3odqmefp71j1q2fmkvpe27m6p88ifm.apps.googleusercontent.com',
      clientSecret: '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',
    },
    (async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await UserModel.findOne({
          where: {
            authGoogleID: profile.id,
          },
        });

        if (user) return done(null, user);

        const createNewUser = await UserModel.create({
          username: profile.displayName,
          email: profile.emails[0].value,
          registerType: 2,
          authGoogleID: profile.id,
        });

        if (createNewUser) {
          await UserInfoModel.create({
            userId: createNewUser.id,
          });
        }

        return done(null, createNewUser);
      } catch (error) {
        done(error, false);
      }
    }),
  ),
);
