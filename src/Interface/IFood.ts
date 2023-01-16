import { Date, Types } from "mongoose"

export interface IFood {
    _id: Types.ObjectId
    name: string
    description: string | null
    image: string | null
    price: number
    foodCategories: Types.ObjectId[]
    created_at: Date
    updated_at: Date
}

export interface IFoodCategory {
    _id: Types.ObjectId
    key: string
    label: string
}