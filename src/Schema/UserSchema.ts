import mongoose, { Model } from "mongoose";
import { IUser } from "../Interface/IUser";
import bcrypt from "bcrypt";

const SALT_WORK_FACTOR = 10

interface IUserMethods {
    comparePassword(inputPassword: string): Promise<boolean>
}

type UserModel = Model<IUser, {}, IUserMethods>

export const UserSchema = new mongoose.Schema<IUser, UserModel, IUserMethods>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

UserSchema.pre('save', async function (next) {
    const user = this
    if (!user.isModified('password')) return next()
    try {
        const salt = await bcrypt.genSalt(SALT_WORK_FACTOR)
        const encrypted = await bcrypt.hash(user.password, salt)
        user.password = encrypted
        next()
    } catch (err) {
        throw err
    }
})

UserSchema.methods.comparePassword =
    async function (
        inputPassword: string,
    ): Promise<boolean> {
        return bcrypt.compare(inputPassword, this.password)
    }

const User = mongoose.model<IUser, UserModel>('User', UserSchema)
export default User