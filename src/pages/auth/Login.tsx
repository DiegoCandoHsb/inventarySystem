/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useNavigate } from "react-router-dom";
import RegisterForm from "../../components/Auth-Components/RegisterForm";
import InputComponent from "../../components/Auth-Components/InputComponent";
import { userSignInData } from "../../interfaces/userSingInData.interface";
import { useForm } from "../../hooks/useForm";
import { ButtonComponent } from "../../components/Auth-Components/ButtonComponent";
import { SignIn } from "../../services/auth.service";
import { LoginResponseData } from "../../interfaces/userSignUpData.interface";

export function Component() {
  const navigate = useNavigate();

  const { email, password, onChange } = useForm<userSignInData>({
    email: "",
    password: "",
  });

  async function signIn(): Promise<LoginResponseData | undefined> {
    try {
      console.log({ email, password });
      const data = await SignIn({ email, password });

      navigate("/");
      console.log(data);
      return data;
    } catch (error: any) {
      alert(error.response?.data.message);
      console.error(error.response?.data);
    }
  }

  return (
    <section>
      <RegisterForm title="Sign In">
        {/* email */}
        <InputComponent
          onChange={(e) => onChange(e.target.value, "email")}
          type="email"
          name="email"
          placeholder="example@exp.com"
          value={email}
        >
          Email
        </InputComponent>

        {/* password */}
        <InputComponent
          onChange={(e) => onChange(e.target.value, "password")}
          type="password"
          name="password"
          placeholder="********"
          value={password}
        >
          Password
        </InputComponent>

        <ButtonComponent title="Sign Up" onclickButton={signIn} />
      </RegisterForm>
    </section>
  );
}

export default function loginLoader() {
  sessionStorage.removeItem("token");
  console.log("Token Eliminado");
  return { hola: true };
}
