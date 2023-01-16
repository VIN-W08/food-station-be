import mongoose, { Schema } from "mongoose";
import { IRefreshToken } from "../Interface/IRefreshToken";

const RefreshTokenSchema = new mongoose.Schema<IRefreshToken>({
    token: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    }
})

const RefreshToken = mongoose.model<IRefreshToken>('RefreshToken', RefreshTokenSchema)
export default RefreshToken