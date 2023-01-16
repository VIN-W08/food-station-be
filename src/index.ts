import dotnet from 'dotenv'
import { App } from './app'
import { FoodController } from './Controller/FoodController'
import { OrderController } from './Controller/OrderController'
import { UserController } from './Controller/UserController'

dotnet.config()

const app = new App(3001, [
    new UserController(),
    new FoodController(),
    new OrderController()
])
app.listen()