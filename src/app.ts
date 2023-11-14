import express, { Application, Request, Response} from 'express'
import cors from 'cors'
import router from './app/routes'
import { ApiNotFoundError } from './app/middleware/apiNotFoundError'
import cookieParser from 'cookie-parser'
import globalErrorHandler from './app/middleware/globalErrorHandler'
const app: Application = express()



app.use(cors())
app.use(cookieParser())

// Parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Application configuration routes
app.use(router)

// Testing routers for testing purposes
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

// Global Error Handler

app.use(globalErrorHandler)
app.use(ApiNotFoundError)
export default app
