import dotnet from 'dotenv'
import { App } from './app'

dotnet.config()

const app = new App(3001, [])
app.listen()