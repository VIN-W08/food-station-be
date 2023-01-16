import { Types } from "mongoose";
export type OrderStatus = 'completed' | 'in-kitchen' | 'in-queue' | 'on-delivery'

export interface IOrder {
    _id: Types.ObjectId
    user: Types.ObjectId
    foods: IOrderFood[]
    recipient: IRecipient
    totalPayable: number
    status: number
    created_at: Date
    updated_at: Date
}

export interface IOrderFood {
    _id: Types.ObjectId
    note: string
    qty: number
    subtotal: number
}

export interface IRecipient {
    recipientName: string,
    contactNumber: string,
    address: string
}