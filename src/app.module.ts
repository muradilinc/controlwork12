import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { LocalStrategy } from './auth/local-strategy';
import { TokenAuthGuard } from './auth/token-auth.guard';
import { PostsController } from './posts/posts.controller';
import { PostItem, PostItemSchema } from './schemas/post.schema';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost/pinterest'),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: PostItem.name, schema: PostItemSchema },
    ]),
    PassportModule,
  ],
  controllers: [AppController, UsersController, PostsController],
  providers: [AppService, AuthService, LocalStrategy, TokenAuthGuard],
})
export class AppModule {}
