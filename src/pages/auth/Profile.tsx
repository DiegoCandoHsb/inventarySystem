import { Card } from "primereact/card";
import { useEffect, useRef, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Button } from "primereact/button";
import {
  UserPlainData,
  defaultUserData,
  userSignUpData,
} from "../../interfaces/userSignUpData.interface";
import InputGroup from "../../components/InputGroup";
import { UpdateUser } from "../../services/user.service";
import { Toast } from "primereact/toast";
import { showErrorMessage } from "../fixedAssets/common/utilities";
import { AxiosError } from "axios";

export default function Profile() {
  const [editFields, setEditFields] = useState<boolean>(false);
  const [userData, setUserData] = useState(defaultUserData);

  const [prevUserId, setPrevUserId] = useState<string>("");

  const toastRef = useRef<Toast>(null);

  const userLoaderData = useLoaderData() as userSignUpData;

  useEffect(() => {
    const sortedData = {
      id: userLoaderData.id,
      name: userLoaderData.name,
      secondname: userLoaderData.details.secondname,
      lastname: userLoaderData.details.lastname,
      secondlastname: userLoaderData.details.secondlastname,
      phone: userLoaderData.details.phone,
      email: userLoaderData.email,
      password: "",

      // informative
      admissionDate: userLoaderData.details.admissionDate,
      payroll: userLoaderData.details.payroll,
      active: userLoaderData.active,
      vacations: userLoaderData.details.vacations,
    } as unknown as UserPlainData;
    setPrevUserId(userLoaderData.id);
    setUserData(sortedData);
  }, []);

  function changeUserData(value: string, key: string) {
    setUserData((currentData) => ({ ...currentData, [key]: value }));
  }

  function editTemplate() {
    switch (editFields) {
      case false:
        return (
          <div className="col-span-full p-2">
            <Button
              className="w-full"
              label="Edit"
              onClick={() => setEditFields(true)}
            />
          </div>
        );
      case true:
        return (
          <div className="flex gap-5 justify-between col-span-full p-2">
            <Button
              className="w-1/2"
              label="Cancel"
              onClick={() => setEditFields(false)}
            />
            <Button
              className="w-1/2"
              label="Save"
              onClick={() => void editProfile()}
            />
          </div>
        );
      default:
        break;
    }
  }

  async function editProfile() {
    const { id, name, email, password, active, ...details } = userData;
    const formatedData: Partial<userSignUpData> = {
      id,
      name,
      email,
      active,
      password,
      details,
    };

    if (password.length < 4) delete formatedData.password;

    await UpdateUser(prevUserId, formatedData as userSignUpData)
      .then(() => setEditFields(false))
      .catch((err: Required<AxiosError<object>>) => {
        showErrorMessage(err, toastRef);
      });
  }

  return (
    <>
      <Card
        title="Profile"
        className="w-2/5 mx-auto my-10"
        footer={editTemplate}
      >
        <div className="m-2 grid grid-cols-12 gap-5">
          <Toast ref={toastRef} position="top-right" />
          <InputGroup
            inputType="text"
            keyfilter="pint"
            name={"id"}
            label="Identification"
            value={userData.id}
            containerSpan="col-span-6"
            onChange={(e) => changeUserData(e.target.value, e.target.id)}
            // disabled={!editFields}
            disabled={true}
          />
          <InputGroup
            inputType="text"
            keyfilter={"pint"}
            name="phone"
            label="Phone"
            value={userData.phone}
            containerSpan="col-span-6"
            onChange={(e) => changeUserData(e.target.value, e.target.id)}
            disabled={!editFields}
          />
          <InputGroup
            inputType="text"
            name="name"
            label="Name"
            value={userData.name}
            containerSpan="col-span-6"
            onChange={(e) => changeUserData(e.target.value, e.target.id)}
            disabled={!editFields}
          />
          <InputGroup
            inputType="text"
            name="secondname"
            label="Second Name"
            value={userData.secondname}
            containerSpan="col-span-6"
            onChange={(e) => changeUserData(e.target.value, e.target.id)}
            disabled={!editFields}
          />
          <InputGroup
            inputType="text"
            name="lastname"
            label="Last Name"
            value={userData.lastname}
            containerSpan="col-span-6"
            onChange={(e) => changeUserData(e.target.value, e.target.id)}
            disabled={!editFields}
          />
          <InputGroup
            inputType="text"
            name="secondlastname"
            label="Second Last Name"
            value={userData.secondlastname}
            containerSpan="col-span-6"
            onChange={(e) => changeUserData(e.target.value, e.target.id)}
            disabled={!editFields}
          />
          <InputGroup
            inputType="text"
            name="email"
            label="Email"
            value={userData.email}
            containerSpan="col-span-full"
            onChange={(e) => changeUserData(e.target.value, e.target.id)}
            disabled={!editFields}
          />
          <InputGroup
            inputType="password"
            name="password"
            label="Password"
            value={userData.password}
            containerSpan="col-span-full"
            onChange={(e) => changeUserData(e.target.value, e.target.name)}
            disabled={!editFields}
          />
          {/* Informative */}
          <InputGroup
            inputType="date"
            name="admissionDate"
            label="Admission Date"
            value={userData.admissionDate}
            containerSpan="col-span-6"
            // onChange={(e) => changeUserData(e.target.value, e.target.id)}
            disabled={true}
          />
          <InputGroup
            inputType="text"
            name="payrool"
            label="Payroll"
            value={userData.payroll}
            containerSpan="col-span-3"
            // onChange={(e) => changeUserData(e.target.value, e.target.id)}
            disabled={true}
          />
          <InputGroup
            inputType="text"
            name="active"
            label="Active"
            value={userData.active ? "Yes" : "No"}
            containerSpan="col-span-3"
            // onChange={(e) => changeUserData(e.target.value, e.target.id)}
            disabled={true}
          />
          {/* vacations */}
          <h1>Vacations</h1>
        </div>
      </Card>
    </>
  );
}
