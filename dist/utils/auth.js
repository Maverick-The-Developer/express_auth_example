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
exports.comparePassword = exports.hashPassword = exports.decrypt = exports.encrypt = void 0;
const jose_1 = require("jose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const secretWord = 'LCSSecretWord';
const keyString = new TextEncoder().encode(secretWord);
const expireTime = 24 * 60 * 60 * 1000; // 1day
function encrypt(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield new jose_1.SignJWT(payload)
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime(new Date(Date.now() + expireTime))
            .sign(keyString);
    });
}
exports.encrypt = encrypt;
function decrypt(input) {
    return __awaiter(this, void 0, void 0, function* () {
        const { payload } = yield (0, jose_1.jwtVerify)(input, keyString, {
            algorithms: ['HS256'],
        });
        return payload;
    });
}
exports.decrypt = decrypt;
function hashPassword(password) {
    return __awaiter(this, void 0, void 0, function* () {
        const salt = yield bcryptjs_1.default.genSalt(10);
        return yield bcryptjs_1.default.hash(password, salt);
    });
}
exports.hashPassword = hashPassword;
function comparePassword(password, hash) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcryptjs_1.default.compare(password, hash);
    });
}
exports.comparePassword = comparePassword;
