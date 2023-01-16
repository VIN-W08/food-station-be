import { Types } from "mongoose";
import { IOrder } from "../Interface/IOrder";
import Order from "../Schema/OrderSchema";

export class OrderService {
    getOrderList = async (userId?: string): Promise<IOrder[]> => {
        const userFilter = userId ? { user: new Types.ObjectId(userId) } : {}
        const filter = { ...userFilter }
        const orderList =
            await Order
                .find(filter)
                .populate({
                    path: 'foods._id',
                    populate: {
                        path: 'foodCategories'
                    }
                })
                .sort({ created_at: 'desc' })
                .limit(30)
                .exec()
        return orderList
    }

    addOrder = async (order: IOrder): Promise<IOrder> => {
        const createdOrder = await Order.create(order)
        return createdOrder
    }

    getOrderById = async (id: Types.ObjectId): Promise<IOrder> => {
        const order = await Order
            .findOne(id)
            .populate({
                path: 'foods._id',
                populate: {
                    path: 'foodCategories'
                }
            })
            .exec()
        if (order) {
            return order
        }
        throw new Error('Selected order is not exist')
    }
}