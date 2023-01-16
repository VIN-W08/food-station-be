import { IFoodCategory } from "../Interface/IFood"
import { IFoodResource } from "../Resource/FoodResource"
import { getFoodCategoryDTO } from "./foodCategory.dto"

export const getFoodDTO = (doc: any): IFoodResource => {
    return {
        _id: doc._id.toString(),
        name: doc.name,
        description: doc.description,
        image: doc.image,
        price: doc.price,
        foodCategories: doc.foodCategories.map((category: IFoodCategory) => getFoodCategoryDTO(category)),
        created_at: doc.created_at,
        updated_at: doc.updated_at,
    }
}