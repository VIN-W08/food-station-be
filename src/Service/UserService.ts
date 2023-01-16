import { IUser } from "../Interface/IUser"
import RefreshToken from "../Schema/RefreshTokenSchema"
import User from "../Schema/UserSchema"
import jwt from 'jsonwebtoken';
import { IAuthInfo } from "../Interface/IAuth";

export class UserService {
    public register = async (user: IUser): Promise<IAuthInfo> => {
        const createdUser = await User.create(user)
        return {
            user: createdUser,
            accessToken: this.generateAccessToken(createdUser),
            refreshToken: await this.generateRefreshToken(createdUser)
        }
    }

    public login = async (user: IUser): Promise<IAuthInfo> => {
        const foundUser = await User.findOne({ email: user.email }).exec()
        if (foundUser) {
            const isMatch = await foundUser.comparePassword(user.password)
            if (isMatch) return {
                user: foundUser,
                accessToken: this.generateAccessToken(foundUser),
                refreshToken: await this.generateRefreshToken(foundUser)
            }
            throw new Error('Incorrect password')
        }
        throw new Error('User not found')
    }

    public logout = async (authInfo: IAuthInfo): Promise<IAuthInfo> => {
        const filter = { token: authInfo.refreshToken, userId: authInfo.user._id }
        const removedRefreshToken = await RefreshToken.findOneAndRemove(filter)
        if (removedRefreshToken) {
            return {
                user: authInfo.user,
                accessToken: '',
                refreshToken: ''
            }
        }
        throw new Error('User is not logged in')
    }

    public refreshAccessToken = async (auth: IAuthInfo): Promise<IAuthInfo> => {
        if (await this.verifyRefreshToken(auth.refreshToken)) {
            return {
                ...auth,
                accessToken: this.generateAccessToken(auth.user)
            }
        }
        throw new Error('Refresh token is not verified')
    }

    public verifyRefreshToken = async (refreshToken: string): Promise<boolean> => {
        const verified = await RefreshToken.findOne({ token: refreshToken }).exec()
        return verified ? true : false
    }

    private generateAccessToken = (user: IUser): string => {
        const accessToken = jwt.sign(JSON.parse(JSON.stringify(user)), process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: 2700 })
        return accessToken
    }

    private generateRefreshToken = async (user: IUser): Promise<string> => {
        const refreshToken = jwt.sign(JSON.parse(JSON.stringify(user)), process.env.REFRESH_TOKEN_SECRET as string)
        const createdRefreshToken = await RefreshToken.create(new RefreshToken({ token: refreshToken, userId: user._id }))
        return createdRefreshToken.token
    }
}