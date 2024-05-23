"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginResponseSchema = exports.loginSchema = void 0;
const zod_1 = require("zod");
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().min(1, '이메일을 입력해야합니다.').email('이메일 형식이 아닙니다.'),
    password: zod_1.z.string().min(1, '비밀번호를 입력해야합니다.'),
});
exports.loginResponseSchema = zod_1.z.object({
    success: zod_1.z.boolean(),
    message: zod_1.z.string(),
    token: zod_1.z.string().optional(),
});
