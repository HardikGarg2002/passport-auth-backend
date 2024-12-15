import express from 'express';
const router = express.Router();
import { asyncHandler } from '@hardikgarg2002/node-errorify';
import { emailPassSignUp, emailPassLogin, getUserProfile } from '../handler/email-pass-handler';
import { authenticateJWT } from '../middleware';

// Signup route
router.post('/signup', asyncHandler(emailPassSignUp));

// Login route
router.post('/login', asyncHandler(emailPassLogin));

// Get user profile (protected route)
router.get('/profile', asyncHandler(authenticateJWT), asyncHandler(getUserProfile));

export default router;
