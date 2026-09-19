import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import ratelimit from "./config/upstash.js";
import rateLimiter from "./middleware/ratelimiter.js";
import cors from "cors";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const _dirname = path.resolve();
// console.log(`Path ${_dirname}`);

// Required for POST/PUT requests to read JSON payloads from req.body
if(process.env.NODE_ENV !== "production"){
    app.use(
        cors({
            origin:"http://localhost:5173",
        })
    );
}

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Support form-encoded request bodies too
app.use(rateLimiter);

app.use((req,res,next)=>{
    console.log(`Req is ${req.method} & URL ${req.url}`);
    next();
});

app.use("/api/notes",notesRoutes);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(_dirname,"../Frontend/dist")));
    app.get("*",(req,res)=>{
        res.sendFile(path.join(_dirname,"../Frontend","dist","index.html"))
    });
}

try {
    await connectDB();
    app.listen(PORT,()=>{
        console.log("Server started on PORT: ",PORT);
    });
} catch (error) {
    console.error("Unable to start server:", error.message);
    process.exit(1);
}