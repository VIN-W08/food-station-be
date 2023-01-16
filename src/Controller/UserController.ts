import { NextFunction, Request, Response, Router } from "express";
import { getErrorMessage } from "../Helper/ErrorHelper";
import { RequestStatus, ResponseResource } from "../Resource/ResponseResource";
import { UserService } from "../Service/UserService";
import { Controller } from "./Controller";
import jwt from 'jsonwebtoken';
import { getAuthDTO } from "../Dto/auth.dto";

export class UserController implements Controller {
    public path = '/user'
    public router = Router()
    public userService: UserService

    constructor() {
        this.userService = new UserService()
        this.initRoutes()
    }

    private initRoutes = () => {
        this.router.post(`${this.path}/login`, this.login)
        this.router.post(`${this.path}/register`, this.register)
        this.router.post(`${this.path}/refreshToken`, this.refreshToken)
        this.router.post(`${this.path}/logout`, this.logout)
    }

    private register = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const auth = await this.userService.register(req.body)
            const authResource = getAuthDTO(auth)
            const response = new ResponseResource(new RequestStatus(200, 'Successful'), authResource)
            res.send(response)
        } catch (err) {
            const response = new ResponseResource(new RequestStatus(200, getErrorMessage(err)), undefined)
            res.send(response)
        }
    }

    private login = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const auth = await this.userService.login(req.body)
            const authResource = getAuthDTO(auth)
            const response = new ResponseResource(new RequestStatus(200, 'Successful'), authResource)
            res.send(response)
        } catch (err) {
            const response = new ResponseResource(new RequestStatus(200, getErrorMessage(err)), undefined)
            res.send(response)
        }
    }

    private refreshToken = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const auth = await this.userService.refreshAccessToken(req.body)
            const authResource = getAuthDTO(auth)
            const response = new ResponseResource(new RequestStatus(200, 'Successful'), authResource)
            res.send(response)
        } catch (err) {
            const response = new ResponseResource(new RequestStatus(200, getErrorMessage(err)), undefined)
            res.send(response)
        }
    }

    private logout = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const auth = await this.userService.logout(req.body)
            const authResource = getAuthDTO(auth)
            const response = new ResponseResource(new RequestStatus(200, 'Successful'), authResource)
            res.send(response)
        } catch (err) {
            const response = new ResponseResource(new RequestStatus(200, getErrorMessage(err)), undefined)
            res.send(response)
        }
    }

    static verifyAccessToken = (req: Request, res: Response, next: NextFunction) => {
        const authHeaders: string = req.headers['authorization' as keyof typeof req.headers] as string
        const accessToken = authHeaders.split(' ')[1]
        try {
            const verified = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET as string)
            if (verified) {
                next()
            } else {
                const response = new ResponseResource(new RequestStatus(200, 'Token is not verified'), undefined)
                res.send(response)
            }
        } catch (err) {
            const response = new ResponseResource(new RequestStatus(401, 'token_expire'), undefined)
            res.status(401).send(response)
        }
    }
}
