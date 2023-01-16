import mongoose, { Schema, Types } from "mongoose";
import { IOrder, IOrderFood, IRecipient } from "../Interface/IOrder";

const OrderFoodSchema = new mongoose.Schema<IOrderFood>({
    _id: {
        type: Schema.Types.ObjectId,
        ref: 'Food',
        required: true
    },
    note: {
        type: String
    },
    qty: {
        type: Number,
        required: true
    },
    subtotal: {
        type: Number,
        required: true
    }
}, {
    _id: false
})

const RecipientSchema = new mongoose.Schema<IRecipient>({
    recipientName: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String || null,
        required: true
    },
    address: {
        type: String || null,
        required: true
    },
}, {
    _id: false
})

const OrderSchema = new mongoose.Schema<IOrder>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    foods: [OrderFoodSchema],
    recipient: RecipientSchema,
    totalPayable: {
        type: Number,
        required: true
    },
    status: {
        type: Number,
        required: true,
        default: 0
    }
},
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    })

const Order = mongoose.model<IOrder>('Order', OrderSchema)
export default Order