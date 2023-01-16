import { IUserResource } from "../Interface/IUser"

export const getUserDTO = (doc: any): IUserResource => {
    return {
        _id: doc._id,
        name: doc.name,
        email: doc.email,
        password: doc.password,
        created_at: doc.created_at,
        updated_at: doc.updated_at
    }
}