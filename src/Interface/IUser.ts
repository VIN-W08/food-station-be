import { Date, Types } from "mongoose"

export interface IUser {
    _id: Types.ObjectId,
    name: string,
    email: string,
    password: string
    created_at: Date,
    updated_at: Date
}

export interface IUserResource {
    _id: string,
    name: string,
    email: string,
    password: string
    created_at: string,
    updated_at: string
}