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
import InputGroup from "../../components/InputGroup";
import { Button } from "primereact/button";

export function Component() {
  const navigate = useNavigate();

  const { email, password, onChange } = useForm<userSignInData>({
    email: "",
    password: "",
  });

  function signIn(): void {
    SignIn({ email, password })
      .then((data) => {
        navigate("/");
        console.log(data);
        return data;
      })
      .catch((error) => {
        alert(error.response?.data.message);
        console.error(error.response?.data);
        return;
      });
  }

  return (
    <section className=" flex h-screen items-center">
      <div className=" flex w-full h-82 justify-center ">
        <RegisterForm title="Sign In">
          {/* email */}
          <InputGroup
            inputType="text"
            label="Email"
            name="email"
            placeholder="example@exp.com"
            value={email}
            keyfilter="email"
            onChange={(e) =>
              onChange(e.target.value, e.target.id as keyof userSignInData)
            }
          />

          {/* password */}
          <InputGroup
            inputType="password"
            label="Password"
            name="password"
            placeholder="***********"
            value={password}
            onChange={(e) =>
              onChange(e.target.value, e.target.name as keyof userSignInData)
            }
          />

          <div className="my-3">
            <Button label="Sign Up" className="w-full" onClick={signIn} />
          </div>
        </RegisterForm>
      </div>
    </section>
  );
}

export default function loginLoader() {
  sessionStorage.removeItem("token");
  return { hola: true };
}
