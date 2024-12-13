import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import bcrypt from 'bcrypt';
import AuthService from './service.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

const authService = new AuthService();
export const initializePassport = () => {
  // Local Strategy for login
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
      const user = await authService.findUserByEmail(email);
      if (!user) return done(null, false, { message: 'No user with that email' });

      try {
        if (await bcrypt.compare(password, user.password)) {
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
        const user = await authService.findUserById(jwtPayload.sub);
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      },
    ),
  );
};
