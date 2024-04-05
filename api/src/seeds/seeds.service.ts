import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { PostItem, PostItemDocument } from '../schemas/post.schema';
import { randomUUID } from 'crypto';
import mongoose, { Model } from 'mongoose';

const DB_URL = 'mongodb://localhost/pinterest';

@Injectable()
export class DataService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(PostItem.name) private postModel: Model<PostItemDocument>,
  ) {
    void this.createFixtureData();
  }

  async dropCollection(db: mongoose.Connection, collectionName: string) {
    try {
      await db.dropCollection(collectionName);
    } catch (e) {
      console.log(
        `Collection ${collectionName} was missing. skipping drop ...`,
      );
    }
  }

  async createFixtureData() {
    await mongoose.connect(DB_URL);
    const db = mongoose.connection;
    const collections = ['artists', 'albums', 'tracks', 'users'];
    for (const collectionName of collections) {
      await this.dropCollection(db, collectionName);
    }
    const [user1, user2, user3] = await this.userModel.create(
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
    );

    await this.postModel.create([
      {
        author: user1._id,
        title: 'Margarita',
        image: '/fixtures/images/post1.avif',
      },
      {
        author: user2._id,
        title: 'Margarita',
        image: '/fixtures/images/post1.avif',
      },
      {
        author: user2._id,
        title: 'Margarita',
        image: '/fixtures/images/post1.avif',
      },
      {
        author: user2._id,
        title: 'Margarita',
        image: '/fixtures/images/post1.avif',
      },
      {
        author: user2._id,
        title: 'Margarita',
        image: '/fixtures/images/ps5.png',
      },
    ]);

    await db.close();
  }
}
