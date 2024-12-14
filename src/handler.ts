import type { Request, Response, NextFunction } from 'express';
import AuthService from './service.js';
import bcrypt from 'bcrypt';
import type { IAuthUser } from './user';
import passport from 'passport';
import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

const authService = new AuthService();
// src/auth/handler.ts
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
  await authService.createUser(newUser);

  res.status(201).json({ message: 'User registered successfully' });
}
