import { IUser, IUserResource } from "./IUser"

export interface IAuthInfo {
    user: IUser
    accessToken: string,
    refreshToken: string
}

export interface IAuthResource {
    user: IUserResource
    accessToken: string,
    refreshToken: string
}