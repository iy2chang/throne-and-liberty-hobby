import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async register(username: string, password: string): Promise<UserDocument> {
    try {
      const userExist = await this.userModel.findOne({ username }).exec();
      if (userExist) {
        throw new ConflictException(`User ${username} already exists`);
      }
      console.log('userExist', userExist);
      console.log('password', password, username);
      const salt = await bcrypt.genSalt();
      console.log('salt', salt);
      const passwordHash = await bcrypt.hash(password, salt);
      const user = await this.userModel.create({
        username,
        passwordHash,
      });

      return user;
    } catch (e) {
      throw e;
    }
  }

  async findUserByUsername(username: string): Promise<UserDocument | null> {
    try {
      const user = await this.userModel
        .findOne({
          username,
        })
        .exec();

      return user;
    } catch (e) {
      throw e;
    }
  }

  async getUsers(
    page = 1,
    limit = 50,
    search?: string,
  ): Promise<{ users: UserDocument[]; total: number }> {
    try {
      const skip = (page - 1) * limit;
      console.log('search', search);
      console.log('page', page);
      const filter = search
        ? { username: { $regex: search, $options: 'i' } }
        : {};

      const total = await this.userModel.countDocuments(filter);
      const users = await this.userModel
        .find(filter)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .exec();

      return { users, total };
    } catch (e) {
      throw e;
    }
  }

  async getUserById(id: string): Promise<UserDocument> {
    try {
      const user = await this.userModel
        .findById(id)
        .select('-passwordHash')
        .exec();

      if (!user) {
        throw new NotFoundException(`User:${id} not found`);
      }

      return user;
    } catch (e) {
      throw e;
    }
  }
}
