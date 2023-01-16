import { Types } from "mongoose";
import { IFood, IFoodCategory } from "../Interface/IFood";
import FoodCategory from "../Schema/FoodCategorySchema";
import Food from "../Schema/FoodSchema";

export class FoodService {
    getFoodCategoryList = async (): Promise<IFoodCategory[]> => {
        const foodCategoryList = await FoodCategory.find().exec()
        return foodCategoryList
    }

    addFoodCategory = async (foodCategory: IFoodCategory): Promise<IFoodCategory> => {
        const createdFoodCategory = await FoodCategory.create(foodCategory)
        return createdFoodCategory
    }

    getFoodList = async (categories: string[], name?: string,): Promise<IFood[]> => {
        const nameFilter = name ? { name: new RegExp(name, 'gi') } : {}
        const categoriesFilter = categories.length !== 0 ? { 'foodCategories': { $in: categories } } : {}
        const filter = { ...nameFilter, ...categoriesFilter }
        const foodList = await Food
            .find(filter)
            .populate('foodCategories')
            .exec()
        return foodList
    }

    getFoodById = async (id: Types.ObjectId): Promise<IFood> => {
        const food = await Food.findById(id).exec()
        if (food) {
            return food
        }
        throw new Error('Selected food is not exist')
    }

    addFood = async (food: IFood, foodImg: Express.Multer.File | null): Promise<IFood> => {
        if (foodImg) food.image = foodImg.filename
        const createdFood = await Food.create(food)
        return createdFood
    }

    updateFood = async (food: IFood): Promise<IFood> => {
        const updatedFood = await Food.findByIdAndUpdate(food._id, food)
        if (updatedFood) {
            return updatedFood
        }
        throw new Error('Selected food is not exist')
    }

    deleteFood = async (foodId: Types.ObjectId): Promise<IFood> => {
        const deletedFood = await Food.findOneAndDelete(foodId)
        if (deletedFood) {
            return deletedFood
        }
        throw new Error('Selected food is not exist')
    }
}