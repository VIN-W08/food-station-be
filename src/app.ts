import { Application } from "express";
import express from 'express'
import mongoose from "mongoose";
import { Controller } from "./Controller/Controller";

export class App {
    public app: Application
    public port: number

    constructor(port: number, controllers: Controller[]) {
        this.app = express()
        this.port = port

        this.initDb()
        this.initMiddleware()
        this.initController(controllers)
    }

    private initDb = async () => {
        await mongoose
            .connect(process.env.MONGODB_CONNECTION as string)
            .then(() => console.log('mongodb connected'))
            .catch((reason) => console.log(reason))
    }

    private initMiddleware = () => {
        this.app.use(express.json())
    }

    private initController = async (controllers: Controller[]) => {
        controllers.forEach(controller => {
            this.app.use('', controller.router)
        })
    }

    public listen = () => {
        this.app.listen(this.port, () => console.log('Listening...'))
    }
}