import prisma from '../prisma/prismaclient'
import { comparePassword, encrypt } from '../utils/auth'
import { LoginInput, LoginResponse, loginSchema } from '../z-schema/authZod'

export async function loginCheck(
  loginInput: LoginInput
): Promise<LoginResponse> {
  try {
    const { email, password } = loginInput
    // check email and password from database
    const user = await prisma.users.findUnique({
      where: {
        email: email,
      },
    })
    if (user !== null) {
      // check password
      // const isPasswordMatch = await comparePassword(password, user.password)
      const isPasswordMatch = password === user.password
      if (isPasswordMatch) {
        const token = await encrypt({
          id: user.id,
          email: user.email,
          role: user.role,
        })
        return { success: true, message: 'Login Success', token: token }
      } else {
        return { success: false, message: 'Password not match' }
      }
    } else {
      return { success: false, message: 'User not found' }
    }
  } catch (err: any) {
    console.error(err.errors)
    return { success: false, message: 'Login Failed' }
  }
}
