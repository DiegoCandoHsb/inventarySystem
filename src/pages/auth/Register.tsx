import { ButtonComponent } from "../../components/Auth-Components/ButtonComponent";
import InputComponent from "../../components/Auth-Components/InputComponent";
import RegisterForm from "../../components/Auth-Components/RegisterForm";
import { useForm } from "../../hooks/useForm";
import {
  plainData,
  userSignUpData,
} from "../../interfaces/userSignUpData.interface";
import { SignUp } from "../../services/auth.service";
import { AxiosError } from "axios";

// export default function Register() {
//   const {
//     email,
//     id,
//     lastname,
//     name,
//     password,
//     phone,
//     confirmPassword,
//     onChange,
//   } = useForm<plainData>({
//     name: "",
//     lastname: "",
//     id: 0,
//     phone: 0,
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   async function signUp(): Promise<userSignUpData | undefined> {
//     const userTransformedData: userSignUpData = {
//       id: id.toString(),
//       name,
//       email,
//       password,
//       details: {
//         lastname,
//         phone: phone.toString(),
//       },
//     };

//     try {
//       const data = await SignUp(userTransformedData);
//       console.log(data);
//       return data;
//     } catch (error) {
//       const axiosError = error as AxiosError;
//       alert(axiosError.response?.data);
//       console.error(axiosError.response?.data);
//     }
//   }
//   return (
//     <section>
//       <RegisterForm title="Sign Up">
//         {/* first name */}
//         <InputComponent
//           inputType="text"
//           name="name"
//           title="First Name"
//           placeholder="Sebastian"
//           value={name}
//           onChangeInput={onChange}
//         />
//         {/* last name */}
//         <InputComponent
//           inputType="text"
//           name="lastname"
//           title="Last Name"
//           placeholder="Ortiz"
//           value={lastname}
//           onChangeInput={onChange}
//         />
//         {/* id number */}
//         <InputComponent
//           inputType="number"
//           name="id"
//           title="Id Number"
//           placeholder="1234567890"
//           value={id}
//           onChangeInput={onChange}
//         />
//         {/* Phone */}
//         <InputComponent
//           inputType="number"
//           name="phone"
//           title="Phone"
//           placeholder="0992889124"
//           value={phone}
//           onChangeInput={onChange}
//         />
//         {/* Email */}
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
//           placeholder="*******"
//           value={password}
//           onChangeInput={onChange}
//         />
//         {/* confirm password */}
//         <InputComponent
//           inputType="password"
//           name="confirmPassword"
//           title="Confirm Password"
//           placeholder="*******"
//           value={confirmPassword}
//           onChangeInput={onChange}
//         />
//         {/* Submit */}
//         <ButtonComponent title="Sign Up" onclickButton={signUp} />
//       </RegisterForm>
//     </section>
//   );
// }

export function Component() {
  const {
    email,
    id,
    lastname,
    name,
    password,
    phone,
    confirmPassword,
    onChange,
  } = useForm<plainData>({
    name: "",
    lastname: "",
    id: 0,
    phone: 0,
    email: "",
    password: "",
    confirmPassword: "",
  });

  async function signUp(): Promise<userSignUpData | undefined> {
    const userTransformedData: userSignUpData = {
      id: id.toString(),
      name,
      email,
      password,
      details: {
        lastname,
        phone: phone.toString(),
      },
    };

    try {
      const data = await SignUp(userTransformedData);
      console.log(data);
      return data;
    } catch (error) {
      const axiosError = error as AxiosError;
      alert(axiosError.response?.data);
      console.error(axiosError.response?.data);
    }
  }
  return (
    <section>
      <RegisterForm title="Sign Up">
        {/* first name */}
        <InputComponent
          inputType="text"
          name="name"
          title="First Name"
          placeholder="Sebastian"
          value={name}
          onChangeInput={onChange}
        />
        {/* last name */}
        <InputComponent
          inputType="text"
          name="lastname"
          title="Last Name"
          placeholder="Ortiz"
          value={lastname}
          onChangeInput={onChange}
        />
        {/* id number */}
        <InputComponent
          inputType="number"
          name="id"
          title="Id Number"
          placeholder="1234567890"
          value={id}
          onChangeInput={onChange}
        />
        {/* Phone */}
        <InputComponent
          inputType="number"
          name="phone"
          title="Phone"
          placeholder="0992889124"
          value={phone}
          onChangeInput={onChange}
        />
        {/* Email */}
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
          placeholder="*******"
          value={password}
          onChangeInput={onChange}
        />
        {/* confirm password */}
        <InputComponent
          inputType="password"
          name="confirmPassword"
          title="Confirm Password"
          placeholder="*******"
          value={confirmPassword}
          onChangeInput={onChange}
        />
        {/* Submit */}
        <ButtonComponent title="Sign Up" onclickButton={signUp} />
      </RegisterForm>
    </section>
  );
}
