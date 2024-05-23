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
const authService_1 = require("../services/authService");
const authZod_1 = require("../z-schema/authZod");
const router = (0, express_1.Router)();
// base path is /auth
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedJson = authZod_1.loginSchema.safeParse(req.body);
    console.log(parsedJson);
    if (parsedJson.success === false) {
        return res.status(400).json({ success: false, message: parsedJson.error.errors[0].message });
    }
    const result = yield (0, authService_1.loginCheck)(parsedJson.data);
    if (result.success) {
        // set token into cookie
        res.cookie('token', result.token, { httpOnly: true, secure: true, sameSite: 'none' });
        return res.status(200).json(result);
    }
    else {
        return res.status(400).json(result);
    }
}));
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedJson = authZod_1.userSchema.safeParse(req.body);
    if (parsedJson.success === false) {
        return res.status(400).json({ success: false, message: parsedJson.error.errors[0].message });
    }
    // 서비스 함수 호출 with parsedJson.data
    // 결과 응답
    return res.status(200).json({ success: true, message: 'Signup Success' });
}));
exports.default = router;
