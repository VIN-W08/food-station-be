import { NextFunction, Request, Response, Router } from "express";
import { getErrorMessage } from "../Helper/ErrorHelper";
import { RequestStatus, ResponseResource } from "../Resource/ResponseResource";
import { Controller } from "./Controller";
import { Types } from "mongoose";
import { OrderService } from "../Service/OrderService";
import { IOrderFood } from "../Interface/IOrder";
import { UserController } from "./UserController";
import { getOrderDTO } from "../Dto/order.dto";
import { convertToBase64 } from "../Helper/FileHelper";

export class OrderController implements Controller {
    public path = '/order'
    public router = Router()
    public orderService: OrderService

    constructor() {
        this.orderService = new OrderService()
        this.initRoutes()
    }

    private initRoutes = () => {
        this.router.get(`${this.path}/list/:userId`, UserController.verifyAccessToken, this.getOrderList)
        this.router.get(`${this.path}/:id`, UserController.verifyAccessToken, this.getOrderById)
        this.router.post(`${this.path}`, UserController.verifyAccessToken, this.addOrder)
    }

    private getOrderList = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const { userId } = req.query
        try {
            const orderListResource =
                (await this.orderService
                    .getOrderList(userId as string))
                    .map(order => getOrderDTO(order))
            const response = new ResponseResource(new RequestStatus(200, 'Successful'), orderListResource)
            res.send(response)
        } catch (err) {
            const response = new ResponseResource(new RequestStatus(200, getErrorMessage(err)), undefined)
            res.send(response)
        }
    }

    private getOrderById = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const order = (await this.orderService.getOrderById(new Types.ObjectId(req.params.id)))
            const orderResource = getOrderDTO(order)
            orderResource.foods.forEach(food => {
                if (food.image)
                    food.image = convertToBase64(`src/Image/food_img/${food.image}`)
            })
            const response = new ResponseResource(new RequestStatus(200, 'Successful'), orderResource)
            res.send(response)
        } catch (err) {
            const response = new ResponseResource(new RequestStatus(200, getErrorMessage(err)), undefined)
            res.send(response)
        }
    }

    private addOrder = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        req.body.user = new Types.ObjectId(req.body.user)
        req.body.foods = req.body.foods.map((food: IOrderFood) => {
            food._id = new Types.ObjectId(food._id)
            return food
        })
        try {
            const order = await this.orderService.addOrder(req.body)
            const orderResource = getOrderDTO(order)
            const response = new ResponseResource(new RequestStatus(200, 'Successful'), orderResource)
            res.send(response)
        } catch (err) {
            const response = new ResponseResource(new RequestStatus(200, getErrorMessage(err)), undefined)
            res.send(response)
        }
    }
}
