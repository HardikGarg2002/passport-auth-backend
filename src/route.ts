import express from 'express';
const router = express.Router();
import { asyncHandler } from '@hardikgarg2002/node-errorify';
import { emailPassSignUp } from './handler.js';

// Signup route
router.post('/signup', asyncHandler(emailPassSignUp));

// Login route

export default router;
