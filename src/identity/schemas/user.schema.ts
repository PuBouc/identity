import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO } from '../dto/create-user.dto';

export type UserDocument = UserModel & Document;

@Schema()
export class UserModel extends Document {
  @Prop({ unique: true })
  email: string;

  @Prop({ unique: true })
  username: string;

  @Prop()
  password: string;

  constructor(user: CreateUserDTO) {
    super();
    this.email = user.email;
    this.username = user.username;
    this.password = user.password;
  }

  public static async createUser(user: CreateUserDTO): Promise<UserModel> {
      return new UserModel({
          email: user.email,
          username: user.username,
          password: await bcrypt.hash(user.password, Number(process.env.HASH_SALT))
      })
  }
}

export const UserSchema = SchemaFactory.createForClass(UserModel);