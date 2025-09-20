// server.js
import 'dotenv/config'; // Import dotenv/config at the very top
import path from 'path';
import express from "express";
const app = express();
import cors from 'cors';

import routeRoutes from "./routes/routeRoutes.js";
import { connectDB } from "./config/db.js";
import { rateLimitMiddleware } from "./middleware/ratelLimter.js";
app.use(express.json()); // Add this line to parse JSON request bodies
 // Log HTTP requests

 app.use(cors({
    origin:'http://localhost:5176'
 }))
app.use(rateLimitMiddleware);
app.use("/api/notes", routeRoutes);

app.use((req,res,next)=>{
    console.log('we just got the request');
    next()
})
connectDB();

// mongodb+srv://khan234:<db_password>@cluster0.frhqyuy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
app.use(express.static(path.resolve("frontend", "vite-project", "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve("frontend", "vite-project", "dist", "index.html"));
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
