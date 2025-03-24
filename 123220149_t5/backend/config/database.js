import { Sequelize } from "sequelize";

const db = new Sequelize('notesdb', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

export default db;