import {
  Body,
  Controller,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import mongoose, { Model } from 'mongoose';
import { CreateUserDto } from './create-user.dto';

@Controller('users')
export class UsersController {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  @Post()
  async register(@Body() registerDto: CreateUserDto) {
    try {
      const user = new this.userModel({
        email: registerDto.email,
        displayName: registerDto.displayName,
        password: registerDto.password,
      });
      user.generateToken();
      await user.save();
      return {
        message: 'Email and password are correct!',
        user,
      };
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        throw new UnprocessableEntityException(error);
      }

      throw error;
    }
  }
}
