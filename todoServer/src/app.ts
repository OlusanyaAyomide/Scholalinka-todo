import express ,{ Request } from "express"
import dotenv from "dotenv"
import cors from "cors"
import morgan from "morgan"
import userRoutes from "./router/userRoutes"
import todoRoute from "./router/todoRoutes"



const app  = express()
app.use(cors())
app.use(morgan("dev"))
app.use(express.json())


app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use('/api/v1/user',userRoutes)
app.use('/api/v1/todo',todoRoute)

app.all('*', (req, res) => {
    return res.status(404).json({ message: 'Route not found' });
});

export default app