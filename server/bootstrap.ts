// import dotenv from "dotenv";
// dotenv.config();

// import "./server.js";


import dotenv from "dotenv";
dotenv.config();

console.log("ENV LOADED:", process.env.MONGODB_URI);

await import("./server.js");