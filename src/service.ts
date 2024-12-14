import AuthUser from './model';

export default class AuthService {
  async createUser(data: any) {
    return AuthUser.create(data);
  }

  async findUserByEmail(email: string) {
    return AuthUser.findOne({ email });
  }

  async findUserById(id: string) {
    return AuthUser.findById(id);
  }
}
