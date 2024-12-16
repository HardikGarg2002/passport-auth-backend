import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export const generateToken = (userId: string, userEmail: string) => {
  return jwt.sign({ sub: userId, email: userEmail }, JWT_SECRET, {
    expiresIn: '1h',
  });
};
