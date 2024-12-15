// import { ObjectId, mongoose } from 'mongoose';
import mongoose from 'mongoose';

export type IAuthUser = {
  _id?: any;
  name: string;
  password: string;
  email: string;
  mobile: string;
  refresh_token: string;
  is_active: boolean;
  role?: {
    id: string;
    name: string;
  };
  is_verified: boolean;
  is_deleted: boolean;
  last_login_at: Date;
  created_at: Date;
  updated_at: Date;
  updated_by: any;
  created_by: any;
};

export type ILoggedInUser = {
  id: string;
  email: string;
  iat: number;
  exp: number;
};
