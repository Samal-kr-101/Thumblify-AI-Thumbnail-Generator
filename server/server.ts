

// import express, { Request, Response } from 'express';
// import cors from "cors";
// import connectDB from "./configs/db.js";
// import session from 'express-session'
// import MongoStore from "connect-mongo";
// import AuthRouter from "./routes/AuthRoutes.js";
// import ThumbnailRouter from "./routes/ThumbnailRoutes.js";
// import UserRouter from "./routes/UserRoutes.js";



// declare module 'express-session' {
//     interface SessionData{
//         isLoggedIn:boolean;
//         userId: string;
//     }
// }

// await connectDB()

// const app = express();

// app.use(express.json());

// // Middleware
// app.use(cors({
//     origin:['http://localhost:5173','http://localhost:3000'],
//     credentials:true
// }))

// app.use(session({
//     secret: process.env.SESSION_SECRET as string,
//     resave: false,
//     saveUninitialized: false,
//     cookie:{maxAge: 1000*60*60*24*7,secure:false}, // 7 days
//     store:MongoStore.create({
//         mongoUrl: process.env.MONGODB_URI as string,
//         collectionName:'sessions'
//     })
// }))



// app.get('/', (req: Request, res: Response) => {
//     res.send('Server is Live!');
// });

// app.use('/api/auth',AuthRouter);
// app.use('/api/thumbnail',ThumbnailRouter);
// app.use('/api/user',UserRouter);
// app.use("/images", express.static("images"));

// console.log("ENV CHECK:", {
//   gemini: process.env.GEMINI_API_KEY,
//   length: process.env.GEMINI_API_KEY?.length,
// });


// // app.post('/debug', (req, res) => {
// //     console.log("HEADERS:", req.headers);
// //     console.log("BODY:", req.body);
// //     res.json({ body: req.body });
// // });


// const port = process.env.PORT || 3000;

// app.listen(port, () => {
//     console.log(`Server is running at http://localhost:${port}`);
// });


import express, { Request, Response } from 'express';
import cors from "cors";
import connectDB from "./configs/db.js";
import session from 'express-session';
import MongoStore from "connect-mongo";
import AuthRouter from "./routes/AuthRoutes.js";
import ThumbnailRouter from "./routes/ThumbnailRoutes.js";
import UserRouter from "./routes/UserRoutes.js";

declare module 'express-session' {
    interface SessionData {
        isLoggedIn: boolean;
        userId: string;
    }
}

await connectDB();

const app = express();

app.use(express.json());

app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3000','https://thumblify-ai-thumbnail-generator-2e.vercel.app'],
    credentials: true
}));

app.use(session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7, secure: false },
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI as string,
        collectionName: 'sessions'
    })
}));

app.get('/', (req: Request, res: Response) => {
    res.send('Server is Live!');
});

app.use('/api/auth', AuthRouter);
app.use('/api/thumbnail', ThumbnailRouter);
app.use('/api/user', UserRouter);
app.use("/images", express.static("images"));

// ✅ DEBUG (KEEP THIS TEMPORARILY)
console.log("ENV CHECK:", {
  gemini: process.env.GEMINI_API_KEY,
  length: process.env.GEMINI_API_KEY?.length,
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});