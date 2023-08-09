import { Button } from "primereact/button";
import RegisterForm from "../../components/Auth-Components/RegisterForm";
import InputGroup from "../../components/InputGroup";
import { useForm } from "../../hooks/useForm";
import {
  UserPlainData,
  defaultUserData,
  userSignUpData,
} from "../../interfaces/userSignUpData.interface";
import { SignUp } from "../../services/auth.service";
import { AxiosError } from "axios";
import { Link, useNavigate } from "react-router-dom";
import { NavigationRoutes } from "../../config/navigationRoutes";
import { Divider } from "primereact/divider";

export function Component() {
  const navigate = useNavigate();

  const {
    email,
    id,
    lastname,
    name,
    secondname,
    secondlastname,
    password,
    phone,
    confirmPassword,
    onChange,
  } = useForm<UserPlainData>(defaultUserData);

  function createUser() {
    const userTransformedData: userSignUpData = {
      id: id.toString(),
      name,
      email,
      password,
      details: {
        lastname,
        secondname,
        secondlastname,
        phone: phone.toString(),
      },
    };

    SignUp(userTransformedData)
      .then((data) => {
        console.log(data);
        navigate("/");
        return data;
      })
      .catch((axiosError: AxiosError) => {
        // const axiosError = error as AxiosError;
        alert(axiosError.response?.data);
        console.error(axiosError.response?.data);
      });
  }
  return (
    <section className="flex justify-center">
      <RegisterForm title="Sign Up">
        {/* first name */}
        <InputGroup
          inputType="text"
          label="Name"
          name="name"
          placeholder="Michael"
          value={name}
          onChange={(e) =>
            onChange(e.target.value, e.target.id as keyof UserPlainData)
          }
        />
        {/* second name */}
        <InputGroup
          inputType="text"
          label="Second Name"
          name="secondname"
          placeholder="Sebastián"
          value={secondname}
          onChange={(e) =>
            onChange(e.target.value, e.target.id as keyof UserPlainData)
          }
        />
        {/* last name */}
        <InputGroup
          inputType="text"
          label="Lastname"
          name="lastname"
          placeholder="Ortiz"
          value={lastname}
          onChange={(e) =>
            onChange(e.target.value, e.target.id as keyof UserPlainData)
          }
        />
        {/* second lastname */}
        <InputGroup
          inputType="text"
          label="Second Lastname"
          name="secondlastname"
          placeholder="Jarrin"
          value={secondlastname}
          onChange={(e) =>
            onChange(e.target.value, e.target.id as keyof UserPlainData)
          }
        />
        {/* id number */}
        <InputGroup
          inputType="text"
          label="Id Number"
          name="id"
          placeholder="1754253142"
          keyfilter="pint"
          value={id}
          onChange={(e) =>
            onChange(e.target.value, e.target.id as keyof UserPlainData)
          }
        />
        {/* Phone */}
        <InputGroup
          inputType="text"
          label="Phone"
          name="phone"
          placeholder="0992881929"
          keyfilter="pint"
          value={phone}
          onChange={(e) =>
            onChange(e.target.value, e.target.id as keyof UserPlainData)
          }
        />
        {/* Email */}
        <InputGroup
          inputType="text"
          label="Email"
          name="email"
          placeholder="example@exp.com"
          value={email}
          keyfilter="email"
          onChange={(e) =>
            onChange(e.target.value, e.target.id as keyof UserPlainData)
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
            onChange(e.target.value, e.target.name as keyof UserPlainData)
          }
        />
        {/* confirm password */}
        <InputGroup
          inputType="password"
          label="Confirm Password"
          name="confirmPassword"
          placeholder="***********"
          value={confirmPassword}
          onChange={(e) =>
            onChange(e.target.value, e.target.name as keyof UserPlainData)
          }
        />
        {/* Submit */}
        <div className="my-3">
          <Button label="Sign Up" className="w-full" onClick={createUser} />
        </div>
        <Divider layout="horizontal" align="center">
          or
        </Divider>
        <Link
          to={NavigationRoutes.login}
          className="w-full flex justify-center"
        >
          <Button label="Sign In" link className="w-1/2" />
        </Link>
      </RegisterForm>
    </section>
  );
}
