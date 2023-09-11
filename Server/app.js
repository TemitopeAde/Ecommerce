import express from 'express';
import nodemon from 'nodemon';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import productRouter from './routes/productRouter.js';


const app = express();
dotenv.config();

app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true}))

app.use("/api/v1/products", productRouter)

// app.get('/post', (req, res) => {
//   console.log(req);
//   res.send('Hello, World!');
// });


const port = process.env.PORT || 5100;

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`Server is running on ${port}`);
  })
} catch (error) {
  console.log(error);
  process.exit(1)
}