import { model, Schema } from 'mongoose';
import { IAuthUser } from './user.js';

const authUserSchema = new Schema<IAuthUser>({
  name: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    select: true,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
  },
  mobile: {
    type: String,
    trim: true,
  },
  refresh_token: {
    type: String,
    select: false,
  },
  is_active: {
    type: Boolean,
    default: false,
  },
  role: {
    type: Object,
  },

  is_verified: {
    type: Boolean,
    default: false,
  },
  is_deleted: {
    type: Boolean,
    default: false,
  },
  last_login_at: {
    type: Date,
    select: false,
  },
  created_at: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  updated_at: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  updated_by: {
    type: Schema.Types.ObjectId,
    ref: 'auth_user',
    select: false,
  },
  created_by: {
    type: Schema.Types.ObjectId,
    ref: 'auth_user',
    select: false,
  },
});

export default model<IAuthUser>('auth_user_test', authUserSchema);
