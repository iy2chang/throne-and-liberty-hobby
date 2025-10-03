import { ConflictException, Injectable } from '@nestjs/common';
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

      const salt = await bcrypt.genSalt();
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

  async getUsers(): Promise<UserDocument[]> {
    try {
      const users = await this.userModel.find().exec();
      return users;
    } catch (e) {
      throw e;
    }
  }
}
