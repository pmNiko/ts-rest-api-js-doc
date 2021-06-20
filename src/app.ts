import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import swaggerUI from 'swagger-ui-express'
import swaggerJsDoc from "swagger-jsdoc";
import { options } from './swaggerOptions'
import tasksRoutes from './routes/tasks.routes'


const app = express()

// utiliza la variable de entorno en caso exista
app.set('port', process.env.PORT || 3000)

const specs = swaggerJsDoc(options);

// middlewares
app.use(cors())
app.use(express.json());
app.use(morgan("dev"));
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));


app.use('/tasks', tasksRoutes)


export default app

