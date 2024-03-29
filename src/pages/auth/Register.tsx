/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
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
import { Link, useNavigate } from "react-router-dom";
import { NavigationRoutes } from "../../config/navigationRoutes";
import { Divider } from "primereact/divider";
import { Toast } from "primereact/toast";
import React, { useRef } from "react";
import axios, { AxiosError } from "axios";
import { inputErrors } from "../fixedAssets/common/utilities";

export function Component() {
  const navigate = useNavigate();
  const toastRef = useRef<Toast>(null);

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
    payroll,
    onChange,
    form,
  } = useForm<UserPlainData>(defaultUserData);

  function showErrorMessage(error: any) {
    console.log(error.response.data.message);
    const errorStrings: string | string[] = error.response.data.message as
      | string
      | string[];

    if (Array.isArray(errorStrings)) {
      errorStrings.map((str) => str.split("details.").join(" ").trim());

      const errorNodeList = [];
      for (let i = 0; i < errorStrings.length; i++) {
        const errorP = React.createElement("h1", { key: i }, errorStrings[i]);
        errorNodeList.push(errorP);
      }
      console.log(errorNodeList);
      toastRef.current?.show({
        severity: "error",
        summary: `Error ${error.response.status as number}`,
        detail: errorNodeList,
        life: 7000,
      });

      return;
    }

    toastRef.current?.show({
      severity: "error",
      summary: `Error ${error.response.status as number}`,
      detail: errorStrings,
      life: 7000,
    });
  }

  function createUser() {
    inputErrors(form);

    if (!form.password.length || form.password !== form.confirmPassword) {
      const headers = new axios.AxiosHeaders();
      return showErrorMessage(
        new AxiosError(
          "error",
          "400",
          { headers },
          {},
          {
            status: 400,
            data: { message: "Passwords are not equals" },
            statusText: "OK",
            config: { headers },
            headers,
          }
        )
      );
    }

    const userTransformedData: userSignUpData = {
      id: id.toString(),
      name,
      email,
      password,
      details: {
        lastname,
        secondname,
        secondlastname,
        phone,
        payroll,
      },
      active: true,
    };

    return SignUp(userTransformedData)
      .then((data) => {
        console.log(data);
        navigate(NavigationRoutes.login);
        return data;
      })
      .catch((err) => {
        showErrorMessage(err);
      });
  }
  return (
    <section className="flex justify-center">
      <Toast ref={toastRef} position="top-right" />
      <RegisterForm title="Sign Up" authMethod={createUser}>
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
          <Button
            label="Sign Up"
            className="w-full"
            // onClick={createUser}
          />
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
