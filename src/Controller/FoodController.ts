import { NextFunction, Request, Response, Router } from "express";
import { getErrorMessage } from "../Helper/ErrorHelper";
import { RequestStatus, ResponseResource } from "../Resource/ResponseResource";
import { Controller } from "./Controller";
import { FoodService } from "../Service/FoodService";
import { Types } from "mongoose";
import multer from "multer";
import { convertToBase64 } from "../Helper/FileHelper";
import { UserController } from "./UserController";
import { getFoodDTO } from "../Dto/food.dto";
import { getFoodCategoryDTO } from "../Dto/foodCategory.dto";

export class FoodController implements Controller {
    public path = '/food'
    public router = Router()
    public foodService: FoodService

    public foodStorage = multer.diskStorage({
        destination(req, file, callback) {
            callback(null, `src/Image/${file.fieldname}`)
        },
        filename(req, file, callback) {
            const currentDate = new Date()
            callback(null, (`${file.fieldname}_` +
                currentDate.getHours().toString() +
                currentDate.getMinutes().toString() +
                currentDate.getSeconds().toString() +
                currentDate.getMilliseconds().toString() +
                currentDate.getDay().toString() +
                currentDate.getMonth().toString() +
                currentDate.getFullYear().toString() + '_' +
                file.originalname.toLowerCase())
                .replace(/[ ]/gi, '_')
            )
        },
    })
    public foodImgUpload = multer({ storage: this.foodStorage })

    constructor() {
        this.foodService = new FoodService()
        this.initRoutes()
    }

    private initRoutes = () => {
        this.router.get(`${this.path}/category/list`, UserController.verifyAccessToken, this.getFoodCategoryList)
        this.router.post(`${this.path}/category`, UserController.verifyAccessToken, this.addFoodCategory)
        this.router.get(`${this.path}/list`, UserController.verifyAccessToken, this.getFoodList)
        this.router.get(`${this.path}/:id`, UserController.verifyAccessToken, this.getFoodById)
        this.router.post(
            `${this.path}`,
            this.foodImgUpload.fields([{ name: 'food_img', maxCount: 1 }])
            , this.addFood
        )
    }

    private getFoodCategoryList = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const foodCategoryList = await this.foodService.getFoodCategoryList()
            const foodCategoryListResource = foodCategoryList.map(category => getFoodCategoryDTO(category))
            const response = new ResponseResource(new RequestStatus(200, 'Successful'), foodCategoryListResource)
            res.send(response)
        } catch (err) {
            const response = new ResponseResource(new RequestStatus(200, getErrorMessage(err)), undefined)
            res.send(response)
        }
    }

    private addFoodCategory = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const foodCategory = await this.foodService.addFoodCategory(req.body)
            const foodCategoryResource = getFoodCategoryDTO(foodCategory)
            const response = new ResponseResource(new RequestStatus(200, 'Successful'), foodCategoryResource)
            res.send(response)
        } catch (err) {
            const response = new ResponseResource(new RequestStatus(200, getErrorMessage(err)), undefined)
            res.send(response)
        }
    }

    private getFoodList = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const { categories, name } = req.query
        try {
            const foodListResource =
                (await this.foodService
                    .getFoodList(categories as string[] ?? [], name as string))
                    .map(food => getFoodDTO(food))
            foodListResource.forEach(food => {
                if (food.image)
                    food.image = convertToBase64(`src/Image/food_img/${food.image}`)
            })
            const response = new ResponseResource(new RequestStatus(200, 'Successful'), foodListResource)
            res.send(response)
        } catch (err) {
            const response = new ResponseResource(new RequestStatus(200, getErrorMessage(err)), undefined)
            res.send(response)
        }
    }

    private getFoodById = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const food = await this.foodService.getFoodById(new Types.ObjectId(req.params.id))
            const foodResource = getFoodDTO(food)
            foodResource.image = convertToBase64(`src/Image/food_img/${foodResource.image}`)
            const response = new ResponseResource(new RequestStatus(200, 'Successful'), foodResource)
            res.send(response)
        } catch (err) {
            const response = new ResponseResource(new RequestStatus(200, getErrorMessage(err)), undefined)
            res.send(response)
        }
    }

    private addFood = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const reqFiles = req.files
        const foodImg = reqFiles ? reqFiles['food_img' as keyof typeof req.files][0] : null
        try {
            const food = await this.foodService.addFood(req.body, foodImg)
            const foodResource = getFoodDTO(food)
            foodResource.image = convertToBase64(`src/Image/food_img/${foodResource.image}`)
            const response = new ResponseResource(new RequestStatus(200, 'Successful'), foodResource)
            res.send(response)
        } catch (err) {
            const response = new ResponseResource(new RequestStatus(200, getErrorMessage(err)), undefined)
            res.send(response)
        }
    }
}
