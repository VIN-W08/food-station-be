import { Schema, Types } from "mongoose"
import { IRecipient } from "../Interface/IOrder"
import { IFoodCategoryResource } from "./FoodResource"

export interface IOrderResource {
    _id: string,
    foods: IOrderFoodResource[]
    recipient: IRecipient
    totalPayable: number
    status: number
    created_at: Date
    updated_at: Date
}

export interface IOrderFoodResource {
    _id: string
    name: string
    description: string | null
    image: string | null
    price: number
    foodCategories: IFoodCategoryResource[]
    note: string
    qty: number
    subtotal: number
}