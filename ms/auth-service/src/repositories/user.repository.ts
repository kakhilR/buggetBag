import { User } from "../models/user.model";

export class UserRepository {
  async findByEmail(email: string) {
    return User.findOne({ email });
  }

  async create(userData: any) {
    return User.create(userData);
  }
}
