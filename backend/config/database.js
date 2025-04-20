import { Sequelize } from "sequelize";

const db = new Sequelize('notes_db', 'root', '', {
    host: '34.55.141.23',
    dialect: 'mysql'
});

export default db;