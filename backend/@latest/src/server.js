// here!
import express from "express";
import {authRoute} from "./routes/authRoute.js";
import { db } from "./config/database.js";
import cors from "cors"

const app = express();

app.use(cors())

db()

app.use(express.json())
app.use("/api/auth" , authRoute)

app.listen(2000, ()=>{
    console.log("port is running");
})


