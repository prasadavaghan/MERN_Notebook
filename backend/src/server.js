import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import notesRoutes from "./routes/noteRoutes.js";
import { connectDb } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
dotenv.config();
// const express = require("express");
const app = express();
const PORT = process.env.PORT || 5001;

//middleware is a function that has access to the request object (req),
// the response object (res), and the next middleware function in the application’s request-response cycle.
// The next middleware function is commonly denoted by a variable named next.
//It is used to parse incoming requests with JSON payloads and is based on body-parser. It parses the text as JSON and exposes the resulting object on req.body.

//custom middleware to log the request url
// app.use((req,res,next)=>{
//     console.log(req.url);
//     next();
// })
app.use(cors());
app.use(express.json());
app.use(rateLimiter);

// app.use(cors({ origin: "http://localhost:5173" })); //when we are using frontend and backend on different ports, we need to enable cors for the frontend port
app.use("/app/notes", notesRoutes);


// Connect to the database and start the server
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running in port: ${PORT}`);
  });
});

