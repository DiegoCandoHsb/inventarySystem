/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useNavigate } from "react-router-dom";
import RegisterForm from "../../components/Auth-Components/RegisterForm";
import InputComponent from "../../components/Auth-Components/InputComponent";
import { userSignInData } from "../../interfaces/userSingInData.interface";
import { useForm } from "../../hooks/useForm";
import { ButtonComponent } from "../../components/Auth-Components/ButtonComponent";
import { SignIn } from "../../services/auth.service";

// export default function Login() {
//   const navigate = useNavigate();

//   const { email, password, onChange } = useForm<userSignInData>({
//     email: "",
//     password: "",
//   });

//   async function signIn() {
//     try {
//       const data = await SignIn({ email, password });

//       navigate("/");
//       console.log(data);
//       return data;
//     } catch (error: any) {
//       // const axiosError = error as AxiosError;
//       alert(error.response?.data.message);
//       console.error(error.response?.data);
//     }
//   }

//   return (
//     <section>
//       <RegisterForm title="Sign In">
//         {/* email */}
//         <InputComponent
//           inputType="email"
//           name="email"
//           title="Email"
//           placeholder="example@exp.com"
//           value={email}
//           onChangeInput={onChange}
//         />

//         {/* password */}
//         <InputComponent
//           inputType="password"
//           name="password"
//           title="Password"
//           placeholder="********"
//           value={password}
//           onChangeInput={onChange}
//         />

//         <ButtonComponent title="Sign Up" onclickButton={signIn} />
//       </RegisterForm>
//     </section>
//   );
// }

// export function loginLoader() {
//   sessionStorage.removeItem("token");
//   return { hola: true };
// }

export function Component() {
  const navigate = useNavigate();

  const { email, password, onChange } = useForm<userSignInData>({
    email: "",
    password: "",
  });

  async function signIn() {
    try {
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

export default function loginLoader() {
  sessionStorage.removeItem("token");
  console.log("Token Eliminado");
  return { hola: true };
}
