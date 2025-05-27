import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// Nyambungin db ke BE
const db = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: "mysql",
         port: process.env.DB_PORT || 3306
    }
);

db.authenticate()
    .then(() => console.log('Koneksi ke database berhasil'))
    .catch((err) => console.log('Gagal koneksi ke database:', err));
export default db;
