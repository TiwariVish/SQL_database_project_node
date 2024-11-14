// import mysql from "mysql2/promise";
// import { Sequelize } from 'sequelize';

// const connectMySQL = async () => {
//   try {
//     const connection = await mysql.createConnection({
//       host: "localhost",
//       user: process.env.DB_USER,
//       password: process.env.DB_PASSWORD,
//       database: process.env.DB_NAME,
//     });
//     console.log("MySQL Database Connected!::::::::");
//     return connection;
//   } catch (error) {
//     console.error("MySQL connection failed:", error.message);
//     throw error;
//   }
// };

// export default connectMySQL;


import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: 'localhost',
    dialect: 'mysql',
    logging: console.log,
  }
);

export default sequelize;