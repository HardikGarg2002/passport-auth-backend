import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import bcrypt from 'bcrypt';
import AuthService from './service.js';
import { generateToken } from './utils/generateToken.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || '';

const authService = new AuthService();

export const initializePassport = () => {
  // Local Strategy for login
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
      try {
        const user = await authService.findUserByEmail(email);
        if (!user) return done(null, false, { message: 'No user with that email' });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Password incorrect' });
        }
      } catch (error) {
        return done(error);
      }
    }),
  );

  // JWT Strategy for protecting routes
  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: JWT_SECRET,
      },
      async (jwtPayload, done) => {
        try {
          const user = await authService.findUserById(jwtPayload.sub);
          if (user) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        } catch (error) {
          return done(error);
        }
      },
    ),
  );

  // Google OAuth Strategy
  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: '/api/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile.emails?.[0].value;
          let user = await authService.findUserByEmail(email);

          // If user doesn't exist, create one

          if (!user) {
            user = await authService.create({
              name: profile.displayName,
              email: email,
              password: null, // No password for Google OAuth users
              is_verified: true,
            });
          }
          return done(null, {
            user: {
              id: user?._id.toString(),
              email: user.email,
            },
          });
        } catch (error) {
          return done(error, false);
        }
      },
    ),
  );
};

// Serialize user to save in session (not used in JWT but required by Passport)
passport.serializeUser((user: any, done) => done(null, user.id));

// Deserialize user (not used in JWT but required by Passport)
passport.deserializeUser(async (id: any, done) => {
  try {
    const user = await authService.findUserById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});
