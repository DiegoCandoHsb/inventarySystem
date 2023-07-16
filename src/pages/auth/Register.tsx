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
          type="text"
          name="name"
          placeholder="Sebastian"
          value={name}
          onChange={(e) => onChange(e.target.value, "name")}
        >
          Name
        </InputComponent>
        {/* last name */}
        <InputComponent
          type="text"
          name="lastname"
          placeholder="Ortiz"
          value={lastname}
          onChange={(e) => onChange(e.target.value, "lastname")}
        >
          Last Name
        </InputComponent>
        {/* id number */}
        <InputComponent
          type="number"
          name="id"
          placeholder="1234567890"
          value={id}
          onChange={(e) => onChange(e.target.value.toString(), "id")}
        >
          Id Number
        </InputComponent>
        {/* Phone */}
        <InputComponent
          type="number"
          name="phone"
          placeholder="0992889124"
          value={phone}
          onChange={(e) => onChange(e.target.value.toString(), "phone")}
        >
          Phone
        </InputComponent>
        {/* Email */}
        <InputComponent
          type="email"
          name="email"
          placeholder="example@exp.com"
          value={email}
          onChange={(e) => onChange(e.target.value, "email")}
        >
          Email
        </InputComponent>
        {/* password */}
        <InputComponent
          type="password"
          name="password"
          placeholder="*******"
          value={password}
          onChange={(e) => onChange(e.target.value, "password")}
        >
          Password
        </InputComponent>
        {/* confirm password */}
        <InputComponent
          type="password"
          name="confirmPassword"
          placeholder="*******"
          value={confirmPassword}
          onChange={(e) => onChange(e.target.value, "confirmPassword")}
        >
          Confirm Password
        </InputComponent>
        {/* Submit */}
        <ButtonComponent title="Sign Up" onclickButton={signUp} />
      </RegisterForm>
    </section>
  );
}
