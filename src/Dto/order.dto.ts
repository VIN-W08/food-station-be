import { IFoodCategory } from "../Interface/IFood";
import { IOrderResource } from "../Resource/OrderResource";
import { getFoodCategoryDTO } from "./foodCategory.dto";

export const getOrderDTO = (order: any): IOrderResource => {
    return {
        _id: order._id.toString(),
        foods: order.foods.map((food: any) => {
            const obj = ({
                _id: food._id._id,
                name: food._id.name,
                description: food._id.description,
                image: food._id.image,
                price: food._id.price,
                foodCategories: food._id.foodCategories.map((category: IFoodCategory) => getFoodCategoryDTO(category)),
                note: food.note,
                qty: food.qty,
                subtotal: food.subtotal
            })
            return obj
        }),
        recipient: order.recipient,
        totalPayable: order.totalPayable,
        status: order.status,
        created_at: order.created_at,
        updated_at: order.updated_at
    }
}