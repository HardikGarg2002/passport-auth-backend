import express from 'express';
import { asyncHandler } from '@hardikgarg2002/node-errorify';
import passport from 'passport';
import { generateToken } from '../utils/generateToken';
import { ILoggedInUser } from '../user';

const router = express.Router();

// Initiate Google OAuth login
router.get('/', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth callback route
router.get('/callback', passport.authenticate('google', { session: false }), (req, res) => {
  // Extract the user and token from the callback
  const { user } = req.user as { user: ILoggedInUser };
  console.log('user in route', user);
  const token = generateToken(user.id as string, user.email);

  // Respond with the token and user info
  res.json({
    message: 'Google login successful',
    token,
    user: {
      id: user.id,
      email: user.email,
    },
  });
});

export default router;
