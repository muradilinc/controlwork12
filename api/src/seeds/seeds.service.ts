import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { PostItem, PostItemDocument } from '../schemas/post.schema';
import { randomUUID } from 'crypto';

@Injectable()
export class SeedsService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(PostItem.name) private postModel: Model<PostItemDocument>,
  ) {}

  async run() {
    await this.clearDatabase();

    await this.userModel.create({
      email: 'admin@admin.com',
      password: 'admin',
      token: randomUUID(),
      role: 'admin',
      displayName: 'vito',
    });

    const [user1, user2] = await this.userModel.create([
      {
        email: 'vito@mafia.com',
        password: 'joe',
        token: randomUUID(),
        role: 'user',
        displayName: 'joe',
      },
      {
        email: 'muradil@muradil.com',
        password: 'muradil',
        token: randomUUID(),
        role: 'user',
        displayName: 'godjo',
      },
    ]);

    await this.postModel.create([
      {
        author: user1._id,
        title: 'Margarita',
        image: '/fixtures/images/post1.avif',
      },
    ]);

    await this.postModel.create([
      {
        author: user2._id,
        title: 'Margarita',
        image: '/fixtures/images/post1.avif',
      },
    ]);

    await this.postModel.create([
      {
        author: user2._id,
        title: 'Margarita',
        image: '/fixtures/images/post1.avif',
      },
    ]);

    await this.postModel.create([
      {
        author: user2._id,
        title: 'Margarita',
        image: '/fixtures/images/post1.avif',
      },
    ]);

    await this.postModel.create([
      {
        author: user2._id,
        title: 'Margarita',
        image: '/fixtures/images/ps5.png',
      },
    ]);
  }

  async clearDatabase() {
    await Promise.all([this.userModel.deleteMany({})]);
    await Promise.all([this.postModel.deleteMany({})]);
  }
}
