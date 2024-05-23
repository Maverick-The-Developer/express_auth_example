import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().min(1, '이메일을 입력해야합니다.').email('이메일 형식이 아닙니다.'),
  password: z.string().min(1, '비밀번호를 입력해야합니다.'),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const loginResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  token: z.string().optional(),
});

export type LoginResponse = z.infer<typeof loginResponseSchema>;

export const userSchema = z.object({
  name: z.string().min(1, '이름을 입력해야합니다.'),
  email: z.string().min(1, '이메일을 입력해야합니다.').email('이메일 형식이 아닙니다.'),
  password: z.string().min(1, '비밀번호를 입력해야합니다.'),
  password_confirm: z.string().min(1, '확인용 비밀번호를 입력해야합니다.'),
  role: z.number().int().positive().optional(), // 0: user , 1 이상 관리자
  telno: z.string().optional(), // 전화번호
});

export type UserForm = z.infer<typeof userSchema>;