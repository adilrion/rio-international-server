import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import router from './app/routes'
import { globalErrorHandler } from './app/middleware/globalErrorHandler'
import { ApiNotFoundError } from './app/middleware/apiNotFoundError'
import cookieParser from 'cookie-parser'
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

app.use(ApiNotFoundError)
app.use(globalErrorHandler)
export default app
