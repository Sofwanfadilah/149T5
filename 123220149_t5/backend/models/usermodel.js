import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Notes = db.define('notes', {
    name: DataTypes.STRING,
    catatan: DataTypes.STRING,
    date: DataTypes.DATE, 
}, {
    freezeTableName: true
});

export default Notes;

(async () => {
    await db.sync({ alter: true }); 
})();