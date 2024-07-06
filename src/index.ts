import express, { Express } from 'express';
import dotenv from 'dotenv';
import commonRouter from './Routes/commonRoutes';
import profileRouter from './Routes/profileRoutes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/common', commonRouter);
app.use('/profile', profileRouter);

app.listen(port, () => {
    console.log(`Server is running at  http://localhost:${port}`);
});