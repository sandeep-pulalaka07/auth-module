import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const DB_NAME = process.env.DB_NAME!;
const DB_USERNAME = process.env.DB_USERNAME!;
const DB_PASSWORD = process.env.DB_PASSWORD!;
const DB_HOST = process.env.DB_HOST!;
const DB_PORT = Number(process.env.DB_PORT);

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

sequelize
    .authenticate()
    .then(() => {
        console.log(`Database connection has beem established successfully !`);
        return sequelize.sync({ alter: true });
    }).then(() => {
        console.info(`Models Synched Successfully !!`)
    })
    .catch(error => {
        console.log(`Error is: ${error}`);
    });

export default sequelize;