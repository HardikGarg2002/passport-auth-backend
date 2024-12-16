import AuthUser from './model';
import { IAuthUser } from './user';

export default class AuthService {
  async isExists(query: any) {
    return await AuthUser.findOne(query);
  }
  async create(data: any) {
    const newUser = new AuthUser(data);
    return await newUser.save();
    // return newUser;
  }

  async findUserByEmail(email: string): Promise<IAuthUser> {
    const user = await AuthUser.findOne({ email });
    if (!user) throw new Error('user not found');
    return user;
  }

  async findUserById(id: string) {
    return await AuthUser.findById(id);
  }
}
