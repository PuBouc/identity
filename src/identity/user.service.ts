import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDTO } from './dto/create-user.dto';
import { IUser, IUserModel } from './interfaces/user.interface';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: IUserModel) {}

    async getUsers(): Promise<IUser[]> {
        const users = await this.userModel.find().exec();

        return users;
    }

    async getUser(userId: string): Promise<IUser> {
        const user = await this.getUniqueUser(userId);

        return user;
    }

    async getUserByName(name: string): Promise<IUser> {
        const user = await this.userModel.findOne({ username: name }).exec();

        return user;
    }

    async createUser(createUserDTO: CreateUserDTO): Promise<IUser> {
        const newUser = await this.userModel.createUser(createUserDTO);

        return newUser.save();
    }

    async updateUserMail(userId: string, email: string): Promise<IUser> {
        const user = await this.getUniqueUser(userId);

        user.email = email;

        return user.save();
    }

    async deleteUser(userId: string) {
        const result = await this.userModel.deleteOne({ _id: userId }).exec();

        if (result.n === 0) {
            throw new NotFoundException('User not found!');
        }

        return true;
    }

    private async getUniqueUser(userId: string): Promise<IUser> {
        const user = await this.userModel.findById(userId).exec();

        if (!user) {
            throw new NotFoundException('User does not exist!');
        }

        return user;
    }
}
