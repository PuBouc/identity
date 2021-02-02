import { Model } from 'mongoose';
import { CreateUserDTO } from '../dto/create-user.dto';
import { UserModel, UserDocument } from '../schemas/user.schema'

export interface IUser extends UserDocument {
    id?:string,
    username: string,
    email: string,
    password: string,
}

export interface IUserModel extends Model<IUser>{
    createUser(user: CreateUserDTO): Promise<UserModel>
}