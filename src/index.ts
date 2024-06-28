import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
    exposedHeaders: ["*"]
}));

app.listen(port, () => {
    console.log(`Server is running at  http://localhost:${port}`);
});