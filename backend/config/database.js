import { Sequelize } from "sequelize";

const db = new Sequelize('notedb', 'root', '', {
    host: '34.121.100.153',
    dialect: 'mysql'
});

export default db;