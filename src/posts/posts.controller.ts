import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  SetMetadata,
  UnprocessableEntityException,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PostItemDocument, PostItem } from '../schemas/post.schema';
import mongoose, { Model } from 'mongoose';
import { CreatePostDto } from './create-post.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import express from 'express';
import { randomUUID } from 'crypto';
import { extname } from 'path';
import { TokenAuthGuard } from '../auth/token-auth.guard';
import { PermitAuthGuard } from '../auth/permit-auth.guard';

@Controller('posts')
export class PostsController {
  constructor(
    @InjectModel(PostItem.name) private postModel: Model<PostItemDocument>,
  ) {}

  @Post()
  @UseGuards(TokenAuthGuard)
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './public/uploads/cocktails',
        filename(
          _req: express.Request,
          file: Express.Multer.File,
          callback: (error: Error | null, filename: string) => void,
        ) {
          const filename = randomUUID();
          callback(null, filename + '' + extname(file.originalname));
        },
      }),
    }),
  )
  async createPost(
    @UploadedFile() file: Express.Multer.File,
    @Body() createPost: CreatePostDto,
  ) {
    try {
      const post = new this.postModel({
        title: createPost.title,
        author: createPost.author,
        image: file ? '/uploads/images/' + file.filename : null,
      });
      await post.save();
      return post;
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        throw new UnprocessableEntityException(error);
      }

      throw error;
    }
  }

  @Get()
  getAll(@Query('userId') userId: string) {
    if (userId) {
      return this.postModel
        .find({ user: userId })
        .populate('user', 'displayName');
    } else {
      return this.postModel.find().populate('user', 'displayName');
    }
  }

  @Get('/:id')
  getOne(@Param('id') id: string) {
    return this.postModel.findById(id).populate('user', 'displayName');
  }

  @UseGuards(TokenAuthGuard, PermitAuthGuard)
  @SetMetadata('roles', 'admin')
  @Delete(':id')
  deleteCocktail(@Param('id') id: string) {
    return this.postModel.findByIdAndDelete(id);
  }
}
