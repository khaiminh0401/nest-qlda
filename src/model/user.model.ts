import { user } from "@prisma/client";

export interface UserModel extends user{}

export type UserLogin = Pick<UserModel, 'username' | 'password'>

export type UserChangePassword = Pick<UserModel, 'id' | 'password'>