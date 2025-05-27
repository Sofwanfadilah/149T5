import express from "express";
import cors from "cors";
import db from "./config/Database.js";
import NoteRoute from "./routes/NoteRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(NoteRoute);
app.use(AuthRoute);

db.authenticate()
    .then(() => console.log("Database terkoneksi"))
    .catch(error => console.log("Error koneksi ke database:", error));

app.listen(5000, () => console.log("Server connected"));
