import { ObjectId } from 'mongoose';

export type IUser = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type IAuthUser = {
  _id?: ObjectId | string;
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
  updated_by: ObjectId;
  created_by: ObjectId;
};

export type ILoggedInUser = {
  id: string;
  email: string;
  iat: number;
  exp: number;
};
