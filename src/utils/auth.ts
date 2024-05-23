import { SignJWT, jwtVerify } from 'jose'
import bcryptjs from 'bcryptjs'

const secretWord = 'LCSSecretWord'
const keyString = new TextEncoder().encode(secretWord)
const expireTime = 24 * 60 * 60 * 1000 // 1day

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(new Date(Date.now() + expireTime))
    .sign(keyString)
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, keyString, {
    algorithms: ['HS256'],
  })
  return payload
}

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcryptjs.genSalt(10)
  return await bcryptjs.hash(password, salt)
}

export async function comparePassword(
  password: string,
  hash: string
): Promise<boolean> {
  return await bcryptjs.compare(password, hash)
}
