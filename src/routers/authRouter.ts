import { Router, Request, Response } from "express";
import { loginCheck } from "../services/authService";
import { loginSchema, userSchema } from "../z-schema/authZod";

const router = Router();

// base path is /auth
router.post("/login", async (req: Request, res: Response) => {
  const parsedJson = loginSchema.safeParse(req.body)
  console.log(parsedJson)
  if (parsedJson.success === false) {
    return res.status(400).json({ success: false, message: parsedJson.error.errors[0].message })
  }

  const result = await loginCheck(parsedJson.data)

  if (result.success) {
    // set token into cookie
    res.cookie('token', result.token, { httpOnly: true, secure: true, sameSite: 'none' })
    return res.status(200).json(result)
  } else {
    return res.status(400).json(result)
  }
})

router.post("/signup", async (req: Request, res: Response) => {
  const parsedJson = userSchema.safeParse(req.body)
  if (parsedJson.success === false) {
    return res.status(400).json({ success: false, message: parsedJson.error.errors[0].message })
  }
  // 서비스 함수 호출 with parsedJson.data

  // 결과 응답
  return res.status(200).json({ success: true, message: 'Signup Success' })
})

export default router