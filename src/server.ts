import express from 'express';
import { connectDB } from './config/databaseConfiguration';
import mainRouter from './routes/indexRouting';
import cors from 'cors';

import dotenv from 'dotenv';
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

connectDB();
app.listen(port, () => {
    console.log(`the server is running:http://localhost:${port}`);

})

const corsOptions = {
    origin: ["http://localhost:5173", "http://localhost:3000"], 
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use("/api_v1", mainRouter)

