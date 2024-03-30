import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from './user.schema';
import mongoose from 'mongoose';

@Schema()
export class PostItem {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true, ref: User.name })
  author: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  image: string;
}

export const PostItemSchema = SchemaFactory.createForClass(PostItem);
export type PostItemDocument = PostItem & Document;
