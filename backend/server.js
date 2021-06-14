import express from 'express'
import products from './data/products.js';
import dotenv from 'dotenv';
const app = express()
dotenv.config()

app.get('',(req,res)=> {
    res.send("server is running");
})

app.get('/api/products',(req,res)=> {
    res.json(products);
})

app.get('/api/product/:id',(req,res)=> {
    const product = products.find(p => p._id === req.params.id)

    res.json(product);
})

const port = process.env.PORT || 5000

app.listen(port,console.log(`server is running in ${process.env.NODE_ENV} on port ${port}`))

