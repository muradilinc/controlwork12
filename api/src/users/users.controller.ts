import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UnauthorizedException,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import mongoose, { Model } from 'mongoose';
import { CreateUserDto, GoogleData } from './create-user.dto';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { TokenAuthGuard } from '../auth/token-auth.guard';
import { OAuth2Client } from 'google-auth-library';
import * as process from 'process';
import { randomUUID } from 'crypto';

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
);

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

  @UseGuards(AuthGuard('local'))
  @Post('sessions')
  async login(@Req() req: Request) {
    return {
      message: 'Email and password are correct!',
      user: req.user,
    };
  }

  @Post('google')
  async googleLogin(@Body() data: GoogleData) {
    const ticket = await client.verifyIdToken({
      idToken: data.credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      return UnauthorizedException;
    }

    const email = payload['email'];
    const id = payload['sub'];
    const displayName = payload['name'];

    if (!email) {
      return UnauthorizedException;
    }

    let user = await this.userModel.findOne({ googleID: id });
    if (!user) {
      user = new this.userModel({
        email: email,
        password: randomUUID(),
        googleID: id,
        displayName,
      });
    }

    user.generateToken();
    await user.save();

    return {
      message: 'Login with google successful!',
      user,
    };
  }

  @Get(':id')
  async getUsers(@Param('id') id: string) {
    const user = await this.userModel.findOne({ _id: id });
    return {
      message: 'Found!',
      user,
    };
  }

  @UseGuards(TokenAuthGuard)
  @Delete('sessions')
  async logout(@Req() req: Request) {
    const user = req.user as UserDocument;
    user.generateToken();
    await user.save();
    return { message: 'Success!', stage: 'Success', user };
  }
}
