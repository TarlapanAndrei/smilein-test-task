import 'reflect-metadata';

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { createConnection } from 'typeorm';

import userRoutes from './routes/user.routes';
import blogRoutes from './routes/blog.routes';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { apiErrorHandler } from './utils/error-handler';
createConnection();

dotenv.config({path: './config.env'});
const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/blogs', blogRoutes);
app.use(apiErrorHandler);

app.listen(3000);

console.log('server on port', 3000);