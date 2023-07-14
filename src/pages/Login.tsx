import RegisterForm from '../components/Auth-Components/RegisterForm';
import InputComponent from '../components/Auth-Components/InputComponent';
import { userSignInData } from '../interfaces/userSingInData.interface';
import { useForm } from '../hooks/useForm';
import { ButtonComponent } from '../components/Auth-Components/ButtonComponent';
import { SignIn } from '../services/auth.service';
import { AxiosError } from 'axios';

export default function Login() {
  const { email, password, onChange } = useForm<userSignInData>({
    email: '',
    password: '',
  });

  async function signIn() {
    try {
      const data = await SignIn({ email, password });

      console.log(data,'bien hecho woody');
      return data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error(axiosError.response?.data);
    }
  }

  return (
    <section>
      <RegisterForm title="Sign In">
        {/* email */}
        <InputComponent
          inputType="email"
          name="email"
          title="Email"
          placeholder="example@exp.com"
          value={email}
          onChangeInput={onChange}
        />

        {/* password */}
        <InputComponent
          inputType="password"
          name="password"
          title="Password"
          placeholder="********"
          value={password}
          onChangeInput={onChange}
        />

        <ButtonComponent title="Sign Up" onclickButton={signIn} />
      </RegisterForm>
    </section>
  );
}
