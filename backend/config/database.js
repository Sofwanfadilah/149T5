import { Sequelize } from "sequelize";

const db = new Sequelize('notedb', 'root', '', {
    host: '34.55.141.23',
    dialect: 'mysql'
});

export default db;