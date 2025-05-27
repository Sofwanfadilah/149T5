import { Sequelize, DataTypes } from 'sequelize';
import db from '../config/Database.js';

// Mendefinisikan model User untuk tabel "user"
const User = db.define(
  'user',
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'users', // Nama tabel di database
  }
);

// Menyinkronkan model ke database
db.sync().then(() => console.log("Database synced"));

export default User;
