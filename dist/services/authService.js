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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginCheck = void 0;
const prismaclient_1 = __importDefault(require("../prisma/prismaclient"));
const auth_1 = require("../utils/auth");
function loginCheck(loginInput) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = loginInput;
            // check email and password from database
            const user = yield prismaclient_1.default.users.findUnique({
                where: {
                    email: email,
                },
            });
            if (user !== null) {
                // check password
                // const isPasswordMatch = await comparePassword(password, user.password)
                const isPasswordMatch = password === user.password;
                if (isPasswordMatch) {
                    const token = yield (0, auth_1.encrypt)({
                        id: user.id,
                        email: user.email,
                        role: user.role,
                    });
                    return { success: true, message: 'Login Success', token: token };
                }
                else {
                    return { success: false, message: 'Password not match' };
                }
            }
            else {
                return { success: false, message: 'User not found' };
            }
        }
        catch (err) {
            console.error(err.errors);
            return { success: false, message: 'Login Failed' };
        }
    });
}
exports.loginCheck = loginCheck;
