"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const authRouter_1 = __importDefault(require("./routers/authRouter"));
const bbsRouter_1 = __importDefault(require("./routers/bbsRouter"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
process.env.NODE_ENV = (process.env.NODE_ENV && (process.env.NODE_ENV).trim().toLowerCase() == 'production') ? 'production' : 'development';
const app = (0, express_1.default)();
const PORT = 3030;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, express_fileupload_1.default)({ useTempFiles: false, defParamCharset: 'utf-8' }));
app.use("/auth", authRouter_1.default);
app.use("/bbs", bbsRouter_1.default);
app.get("/", (req, res) => {
    res.send("Hello World! (Express + Typescript)");
});
app.listen(PORT, () => {
    console.log(`[LOG] Server is running, http://localhost:${PORT}`);
});
