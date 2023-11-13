import path from 'path';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors'
import cookieParser from 'cookie-parser';
import express from 'express'; 
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js'
import connectDB from './config/db.js';


const app = express(); 
connectDB();
const port = 5000;

//border parser Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cookieParser());



app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);
app.get('/api/config/paypal', (req, res)=> res.send({ clientId: process.env.PAYPAL_CLIENT_ID }));

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));


app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
