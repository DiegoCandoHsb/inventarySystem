import { userSignUpData } from '../interfaces/userSignUpData.interface';
import { userSignInData } from '../interfaces/userSingInData.interface';
import { HsbBaseApiDb } from './api.db';

export async function SignUp(
  userData: userSignUpData
): Promise<userSignUpData> {
  const res = await HsbBaseApiDb.post<userSignUpData>(
    '/auth/register',
    userData
  );

  return res.data;
}

export async function SignIn({
  email,
  password,
}: userSignInData): Promise<userSignInData> {
  const res = await HsbBaseApiDb.post<userSignInData>('/auth/login', {
    email,
    password,
  });
  return res.data
}
