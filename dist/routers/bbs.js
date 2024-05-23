"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.use((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // middle ware
    const startTime = new Date().toLocaleTimeString();
    const startMilli = new Date().getMilliseconds();
    console.log(`========= BBS MIDDLEWARE Starts at ${startTime}.${startMilli} ========`);
    const delay = yield new Promise((resolve) => setTimeout(() => resolve('done'), 1000));
    const endTime = new Date().toLocaleTimeString();
    const endMili = new Date().getMilliseconds();
    console.log(`========= BBS MIDDLEWARE End. at ${endTime}.${endMili} ========`);
    next();
}));
// base path is /bbs
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.files) {
        const tempo = Object.entries(req.files).map(([key, value]) => {
            return { key, value };
        });
        for (const { key, value } of tempo) {
            console.log('fieldName:', key);
            console.log('file', value);
            console.log('========================================================================');
        }
    }
    console.log('========= FILES DONE ========');
    //
    const { title, content } = req.body;
    console.log("🚀 ~ router.post ~ title:", title);
    console.log("🚀 ~ router.post ~ content:", content);
    console.log('========= JSON DONE ========');
    const newId = 0;
    res.status(200).json({ success: true, message: `created new post, id is ${newId}` });
}));
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const dataList = [];
    res.status(200).json({ success: true, message: `get all posts`, list: dataList });
}));
exports.default = router;
