/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable, DataTableRowClickEvent } from "primereact/datatable";
import { GetUsers } from "../../services/user.service";
import {
  UserPlainData,
  defaultUserData,
  userSignUpData,
} from "../../interfaces/userSignUpData.interface";
import { useLoaderData } from "react-router-dom";
import React, { useRef, useState } from "react";
import { HumanResourcesLoader } from "../../interfaces/humanResLoader.interface";
import { Dialog } from "primereact/dialog";
import { useForm } from "../../hooks/useForm";
import InputGroup from "../../components/InputGroup";
import { createUser } from "../../services/humanResources.service";
import TableHeaderComponent from "../../components/TableHeaderComponent";
import { Toast } from "primereact/toast";

export default function HumanResources() {
  const [users, setUsers] = useState<userSignUpData[]>(
    (useLoaderData() as HumanResourcesLoader).users
  );

  const [modal, setModal] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);

  const { form, onChange, setState } = useForm<UserPlainData>(defaultUserData);
  const toastRef = useRef<Toast>(null);

  function openModal() {
    setState(defaultUserData);
    setModal(true);
  }

  function updateModal(e: DataTableRowClickEvent) {
    const { details, ...hsbData } = e.data as userSignUpData;

    setState({
      ...hsbData,
      ...details,
      name: hsbData.name.split(" ")[0],
    } as UserPlainData);
    setEdit(true);
  }

  function showErrorMessage(error: any) {
    const errorStrings: string[] = (
      error.response.data.message as string[]
    ).map((str) => str.split("details.").join(" ").trim());

    const errorNodeList = [];
    for (let i = 0; i < errorStrings.length; i++) {
      const errorP = React.createElement("p", { key: i }, errorStrings[i]);
      errorNodeList.push(errorP);
    }

    toastRef.current?.show({
      severity: "error",
      summary: `Error ${error.response.status as number}`,
      detail: errorNodeList,
      life: 7000,
    });
  }

  const AddUser = () => {
    const userTransformedData: userSignUpData = {
      id: form.id.toString(),
      name: form.name,
      email: form.email,
      password: form.password,
      details: {
        lastname: form.lastname,
        secondname: form.secondname,
        secondlastname: form.secondlastname,
        phone: form.phone.toString(),
      },
    };

    createUser(userTransformedData)
      .then((data) => {
        setModal(false);
        console.log(users);
        return data;
      })
      .catch((err) => {
        showErrorMessage(err);
      })
      .finally(async () => await setNewUser());
  };

  const setNewUser = async () => {
    const newUsers = await GetUsers();
    console.log(newUsers);
    setUsers([...newUsers]);
    setModal(false);
  };

  return (
    <div>
      <section className="mx-2">
        <Toast ref={toastRef} position="top-right" />
        <div className="my-5">
          <Button label="Add" onClick={openModal} />
        </div>
        <DataTable
          className="shadow-md"
          header={<TableHeaderComponent headerTitle="Human Resources" />}
          stripedRows
          value={
            users
              ? users.map(({ name, ...userData }: userSignUpData) => {
                  const userFullName = name.concat(
                    " ",
                    userData.details.secondname,
                    " ",
                    userData.details.lastname,
                    " ",
                    userData.details.secondlastname
                  );

                  return { ...userData, name: userFullName };
                })
              : []
          }
          emptyMessage={"No Users found"}
          selectionMode="single"
          title="Human Resources"
          onRowDoubleClick={(e) => updateModal(e)}
          // paginator
          rows={25}
          rowsPerPageOptions={[25, 50, 75, 100]}
          tableStyle={{ minWidth: "50rem" }}
        >
          <Column header="Idetification" field="id" style={{ width: "15%" }} />
          <Column header="User Name" field="name" style={{ width: "20%" }} />
          <Column header="Email" field="email" style={{ width: "20%" }} />
          <Column header="Active" field="active" style={{ width: "20%" }} />
        </DataTable>
      </section>
      {/* modal to update user */}
      <Dialog
        visible={edit}
        onHide={() => setEdit(false)}
        header="Edit User"
        className="w-2/5"
      >
        <div className="flex justify-between">
          <InputGroup
            inputType="text"
            keyfilter={"pint"}
            label="Identification"
            name="id"
            placeholder="1728548544"
            value={form.id}
            onChange={(e) =>
              onChange(e.target.value, e.target.id as keyof UserPlainData)
            }
            className="w-1/2 p-2"
          />
          <InputGroup
            inputType="text"
            keyfilter={"pint"}
            label="Phone"
            name="phone"
            placeholder="0979301325"
            value={form.phone}
            onChange={(e) =>
              onChange(e.target.value, e.target.id as keyof UserPlainData)
            }
            className="w-1/2 p-2 "
          />
        </div>
        <div className="flex justify-between">
          <InputGroup
            inputType="text"
            label="First Name"
            name="name"
            placeholder="David"
            value={form.name}
            onChange={(e) =>
              onChange(e.target.value, e.target.id as keyof UserPlainData)
            }
            className="w-1/2 p-2"
          />
          <InputGroup
            inputType="text"
            label="Second Name"
            name="secondname"
            placeholder="Mateo"
            value={form.secondname}
            onChange={(e) =>
              onChange(e.target.value, e.target.id as keyof UserPlainData)
            }
            className="w-1/2 p-2 "
          />
        </div>
        <div className="flex justify-between">
          <InputGroup
            inputType="text"
            label="Surname"
            name="lastname"
            placeholder="Castro"
            value={form.lastname}
            onChange={(e) =>
              onChange(e.target.value, e.target.id as keyof UserPlainData)
            }
            className="w-1/2 p-2"
          />
          <InputGroup
            inputType="text"
            label="Second Surname"
            name="secondlastname"
            placeholder="Castro"
            value={form.secondlastname}
            onChange={(e) =>
              onChange(e.target.value, e.target.id as keyof UserPlainData)
            }
            className="w-1/2 p-2 "
          />
        </div>
        <div className="flex">
          <InputGroup
            inputType="text"
            keyfilter={"email"}
            label="Email"
            name="email"
            placeholder="example@exam.com"
            value={form.email}
            onChange={(e) =>
              onChange(e.target.value, e.target.id as keyof UserPlainData)
            }
            className="p-2 w-4/6"
          />
          {/* falta check box aqui */}
        </div>
      </Dialog>
      {/* Modal to create user */}
      <Dialog
        visible={modal}
        onHide={() => setModal(false)}
        header="Create User"
        className="w-2/5 flex"
      >
        <div className="flex justify-between">
          <InputGroup
            inputType="text"
            keyfilter={"pint"}
            label="Identification"
            name="id"
            placeholder="1728548544"
            value={form.id}
            onChange={(e) =>
              onChange(e.target.value, e.target.id as keyof UserPlainData)
            }
            className="w-1/2 p-2"
          />
          <InputGroup
            inputType="text"
            keyfilter={"pint"}
            label="Phone"
            name="phone"
            placeholder="0979301325"
            value={form.phone}
            onChange={(e) =>
              onChange(e.target.value, e.target.id as keyof UserPlainData)
            }
            className="w-1/2 p-2 "
          />
        </div>
        <div className="flex justify-between">
          <InputGroup
            inputType="text"
            label="First Name"
            name="name"
            placeholder="David"
            value={form.name}
            onChange={(e) =>
              onChange(e.target.value, e.target.id as keyof UserPlainData)
            }
            className="w-1/2 p-2"
          />
          <InputGroup
            inputType="text"
            label="Second Name"
            name="secondname"
            placeholder="Mateo"
            value={form.secondname}
            onChange={(e) =>
              onChange(e.target.value, e.target.id as keyof UserPlainData)
            }
            className="w-1/2 p-2 "
          />
        </div>
        <div className="flex justify-between">
          <InputGroup
            inputType="text"
            label="Surname"
            name="lastname"
            placeholder="Castro"
            value={form.lastname}
            onChange={(e) =>
              onChange(e.target.value, e.target.id as keyof UserPlainData)
            }
            className="w-1/2 p-2"
          />
          <InputGroup
            inputType="text"
            label="Second Surname"
            name="secondlastname"
            placeholder="Castro"
            value={form.secondlastname}
            onChange={(e) =>
              onChange(e.target.value, e.target.id as keyof UserPlainData)
            }
            className="w-1/2 p-2 "
          />
        </div>
        <InputGroup
          inputType="text"
          keyfilter={"email"}
          label="Email"
          name="email"
          placeholder="example@exam.com"
          value={form.email}
          onChange={(e) =>
            onChange(e.target.value, e.target.id as keyof UserPlainData)
          }
          className="p-2"
        />
        <InputGroup
          inputType="text"
          label="Password"
          name="password"
          placeholder="*******"
          value={form.password}
          onChange={(e) =>
            onChange(e.target.value, e.target.id as keyof UserPlainData)
          }
          className="p-2"
        />
        <InputGroup
          inputType="text"
          label="Confirm Password"
          name="confirmPassword"
          placeholder="*******"
          value={form.confirmPassword}
          onChange={(e) =>
            onChange(e.target.value, e.target.id as keyof UserPlainData)
          }
          className="p-2"
        />
        <div className="w-full p-2 mt-2">
          <Button
            label="Create User"
            className="w-full p-2"
            onClick={AddUser}
          />
        </div>
      </Dialog>
    </div>
  );
}

export async function HumanResourcesLoader(): Promise<HumanResourcesLoader> {
  const users: userSignUpData[] = await GetUsers();

  return {
    users,
  };
}
