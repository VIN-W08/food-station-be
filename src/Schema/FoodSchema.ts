import mongoose, { Schema } from "mongoose";
import { IFood } from "../Interface/IFood";

export const FoodSchema = new mongoose.Schema<IFood>({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String || null,
        required: false
    },
    image: {
        type: String || null,
        required: false
    },
    price: {
        type: Number,
        required: true
    },
    foodCategories: [{
        type: Schema.Types.ObjectId,
        ref: 'FoodCategory',
        required: true
    }]
},
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    })

const Food = mongoose.model<IFood>('Food', FoodSchema)
export default Food