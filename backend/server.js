import express from 'express'
import products from './data/products.js';
import connectDB from './config/db.js'
import dotenv from 'dotenv';
import { errorHandler , notFound} from './middlewares/errorMiddleware.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'

const app = express()
app.use(express.json())
dotenv.config()

connectDB();
app.get('',(req,res)=> {
    res.send("server is running");
})

app.use('/api/products' , productRoutes)
app.use('/api/users' , userRoutes)

app.use(notFound)

app.use(errorHandler)

const port = process.env.PORT || 5000

app.listen(port,console.log(`server is running in ${process.env.NODE_ENV} on port ${port}`))