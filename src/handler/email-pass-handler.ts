import type { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import AuthService from '../service';
import { IAuthUser } from '../user';
import { generateToken } from '../utils/generateToken';

const authService = new AuthService();

// Signup Handler
export async function emailPassSignUp(req: Request, res: Response, _next: NextFunction) {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const existingUser = await authService.findUserByEmail(email);
  if (existingUser) {
    return res.status(400).json({ message: 'Email already registered' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser: Partial<IAuthUser> = { name, email, password: hashedPassword };
  await authService.create(newUser);

  res.status(201).json({ message: 'User registered successfully' });
}

// Login Handler
export async function emailPassLogin(req: Request, res: Response, _next: NextFunction) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const user = await authService.findUserByEmail(email);
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const token = generateToken(user._id as string, user.email);
  res.status(200).json({ message: 'Login successful', token });
}

// Get User Profile Handler
export async function getUserProfile(req: Request, res: Response, _next: NextFunction) {
  const userId = req.body.loggedInUser.id; // `req.user` will be populated by the `authenticateJWT` middleware
  const user = await authService.findUserById(userId);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.status(200).json({ user });
}
