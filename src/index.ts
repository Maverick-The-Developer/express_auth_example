import cors from "cors";
import express, { Express, Request, Response } from "express";
import authRouter from "./routers/authRouter";
import bbsRouter from './routers/bbsRouter'
import fileUpload from "express-fileupload";

process.env.NODE_ENV = ( process.env.NODE_ENV && ( process.env.NODE_ENV ).trim().toLowerCase() == 'production' ) ? 'production' : 'development';

const app: Express = express();
const PORT: number = 3030;

app.use(cors())
app.use(express.json());
app.use(fileUpload({useTempFiles: false, defParamCharset: 'utf-8'}))
app.use("/auth", authRouter);
app.use("/bbs", bbsRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World! (Express + Typescript)");
});

app.listen(PORT, () => {
  console.log(`[LOG] Server is running, http://localhost:${PORT}`);
});
