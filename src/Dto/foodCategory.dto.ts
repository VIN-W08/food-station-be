import { IFoodCategoryResource } from "../Resource/FoodResource"

export const getFoodCategoryDTO = (doc: any): IFoodCategoryResource => {
    return {
        _id: doc._id.toString(),
        key: doc.key,
        label: doc.label
    }
}