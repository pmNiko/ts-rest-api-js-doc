import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import tasksRoutes from './routes/tasks.routes'

const app = express()

// utiliza la variable de entorno en caso exista
app.set('port', process.env.PORT || 3000)

app.use(cors())                //comunicación con otros server
app.use(morgan('dev'))
app.use(express.json())

app.use('/tasks', tasksRoutes)

export default app

