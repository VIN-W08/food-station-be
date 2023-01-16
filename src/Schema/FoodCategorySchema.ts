import mongoose from "mongoose";
import { IFoodCategory } from "../Interface/IFood";

export const FoodCategorySchema = new mongoose.Schema<IFoodCategory>({
    key: {
        type: String,
        required: true
    },
    label: {
        type: String,
        required: true
    }
})

const FoodCategory = mongoose.model<IFoodCategory>('FoodCategory', FoodCategorySchema)
export default FoodCategory