"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// base path is /login
router.post("/", (req, res) => {
    const { email, password } = req.body;
    res.status(200).json({ success: true, message: `Login Success: ${email}, ${password}` });
});
exports.default = router;
