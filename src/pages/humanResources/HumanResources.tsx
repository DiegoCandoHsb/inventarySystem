/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Button } from "primereact/button";
import { Column, ColumnBodyOptions } from "primereact/column";
import { DataTable, DataTableRowClickEvent } from "primereact/datatable";
import { GetUsers } from "../../services/user.service";
import {
  UserPlainData,
  defaultUserData,
  userSignUpData,
} from "../../interfaces/userSignUpData.interface";
import { useLoaderData, useOutletContext } from "react-router-dom";
import { useRef, useState } from "react";
import { HumanResourcesLoader } from "../../interfaces/humanResLoader.interface";
import { Dialog } from "primereact/dialog";
import { useForm } from "../../hooks/useForm";
import InputGroup from "../../components/InputGroup";
import { createUser } from "../../services/humanResources.service";
import TableHeaderComponent from "../../components/TableHeaderComponent";
import React from "react";
import { Toast } from "primereact/toast";
import { Vacations } from "../../interfaces/user.interface";
import axios, { AxiosError } from "axios";
import { inputErrors } from "../fixedAssets/common/utilities";
import LoadSpinner from "../../components/LoadSpinner";

export default function HumanResources() {
  const [users, setUsers] = useState<userSignUpData[]>(
    (useLoaderData() as HumanResourcesLoader).users
  );

  const [modal, setModal] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);

  const { form, onChange, setState } = useForm<UserPlainData>(defaultUserData);

  const currentDate = new Date().toISOString().split("T")[0];
  const [dates, setDates] = useState<Vacations>({
    startVacationDay: currentDate,
    endVacationDay: currentDate,
    days: 0,
  });

  const toastRef = useRef<Toast>(null);
  const [turnSpinner, setTurnSpinner] = useOutletContext();

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

  const AddUser = () => {
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
      id: form.id.toString(),
      name: form.name,
      email: form.email,
      password: form.password,
      details: {
        lastname: form.lastname,
        secondname: form.secondname,
        secondlastname: form.secondlastname,
        phone: form.phone.toString(),
        vacations: form.vacations,
        payroll: form.payroll,
      },
      active: form.active,
    };

    createUser(userTransformedData)
      .then((data) => {
        setModal(false);
        return data;
      })
      .catch((err) => {
        setModal(true);
        showErrorMessage(err);
      })
      .finally(async () => await setNewUser());
  };

  const setNewUser = async () => {
    const newUsers = await GetUsers();
    setUsers([...newUsers]);
  };

  function setNewVacations() {
    if (dates.startVacationDay > dates.endVacationDay) {
      const headers = new axios.AxiosHeaders();
      return showErrorMessage(
        new AxiosError(
          "error",
          "400",
          { headers },
          {},
          {
            status: 400,
            data: { message: "Invalid Start or End vacation date" },
            statusText: "OK",
            config: { headers },
            headers,
          }
        )
      );
    }
    setState((currentData) => ({
      ...currentData,
      vacations: [
        ...currentData.vacations,
        {
          ...dates,
          days: getLaborableDays(dates.startVacationDay, dates.endVacationDay),
        },
      ],
    }));
  }

  function getLaborableDays(date1: string, date2: string) {
    const prevDate = new Date(date1).getTime();
    const nextDate = new Date(date2).getTime();
    const difference = (nextDate - prevDate) / (24 * 60 * 60 * 1000) + 1;
    return difference;
  }

  function updateUser() {
    console.log(form);
  }

  function deleteRowButton(_: Vacations, column: ColumnBodyOptions) {
    return (
      <InputGroup
        inputType="button"
        name="Delete"
        value=""
        buttonIcon="pi-times"
        containerCls="-my-2 p-0"
        onButtonClick={() => {
          setState((currentData) => ({
            ...currentData,
            vacations: currentData.vacations.filter(
              (_, i) => i !== column.rowIndex
            ),
          }));
        }}
      />
    );
  }

  function toggleElement(e?: React.MouseEvent<HTMLElement>) {
    const nextElement = e?.currentTarget.nextElementSibling;
    const elmClasses = [...(nextElement?.classList as unknown as string[])];

    if (elmClasses.includes("hidden")) {
      return nextElement?.classList.remove("hidden");
    }
    return nextElement?.classList.add("hidden");
  }

  function activeSymb(userData: userSignUpData) {
    const userActive = userData.active;
    const activeSymbol = React.createElement("div", {
      className: `w-5 h-5 rounded-full mx-auto ${
        userActive ? "bg-lime-600" : "bg-red-700"
      }`,
    });

    return activeSymbol;
  }

  return (
    <>
      {!users ? (
        <LoadSpinner />
      ) : (
        <div>
          <section className="mx-2">
            <Toast ref={toastRef} position="top-right" />
            <div className="my-5">
              <Button label="Add" onClick={openModal} />
            </div>
            <DataTable
              className="shadow-md"
              size="small"
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
                      return {
                        ...userData,
                        name: userFullName,
                      };
                    })
                  : []
              }
              emptyMessage={"No Users found"}
              selectionMode="single"
              title="Human Resources"
              onRowDoubleClick={(e) => updateModal(e)}
              paginator
              rows={25}
              rowsPerPageOptions={[25, 50, 75, 100]}
              sortField="active"
              sortOrder={-1}
            >
              <Column
                header="Idetification"
                field="id"
                sortable
                align="center"
                alignHeader="center"
              />
              <Column
                header="User Name"
                field="name"
                sortable
                align="center"
                alignHeader="center"
              />
              <Column
                header="Email"
                field="email"
                sortable
                align="center"
                alignHeader="center"
              />
              <Column
                header="Payroll"
                field="details.payroll"
                sortable
                align="center"
                alignHeader="center"
              />
              <Column
                header="Active"
                field="active"
                body={(e: userSignUpData) => activeSymb(e)}
                sortable
                align="center"
                alignHeader="center"
              />
            </DataTable>
          </section>
          {/* modal to update user */}
          <Dialog
            visible={edit}
            onHide={() => setEdit(false)}
            header="Edit User"
            className="w-2/5 bg-red-500"
          >
            <div className="grid grid-cols-4 gap-2">
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
              />
              <InputGroup
                inputType="text"
                label="First Name"
                name="name"
                placeholder="David"
                value={form.name}
                onChange={(e) =>
                  onChange(e.target.value, e.target.id as keyof UserPlainData)
                }
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
              />
              <InputGroup
                inputType="text"
                label="Surname"
                name="lastname"
                placeholder="Castro"
                value={form.lastname}
                onChange={(e) =>
                  onChange(e.target.value, e.target.id as keyof UserPlainData)
                }
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
              />
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
                containerSpan="col-span-3"
              />
              <InputGroup
                inputType="checkbox"
                label="Active"
                name="active"
                value={form.active}
                onCheckBoxChange={(e) =>
                  onChange(
                    Boolean(!e.value),
                    e.target.id as keyof UserPlainData
                  )
                }
                containerSpan="col-span-1"
              />
              {/* vacations */}
              <div className="bg-level-3 col-span-full rounded-md shadow-md shadow-zinc-500">
                <h1
                  className="w-full text-2xl font-bold text-center bg-level-2 mx-auto py-2"
                  onClick={toggleElement}
                >
                  Vacations
                </h1>
                <div className="col-span-full grid grid-cols-7 gap-2 rounded-md p-2">
                  <InputGroup
                    inputType="date"
                    label="Start vacation day"
                    name="startDay"
                    placeholder={new Date().toISOString().split("T")[0]}
                    value={dates.startVacationDay.toString()}
                    onDateChange={(e) =>
                      setDates((currentValues) => ({
                        ...currentValues,
                        startVacationDay: new Date(e.value as Date)
                          .toISOString()
                          .split("T")[0],
                      }))
                    }
                    containerSpan="col-span-3"
                  />
                  <InputGroup
                    inputType="date"
                    label="End vacation day"
                    name="startDay"
                    placeholder={new Date().toISOString().split("T")[0]}
                    value={dates.endVacationDay.toString()}
                    onDateChange={(e) =>
                      setDates((currentValues) => ({
                        ...currentValues,
                        endVacationDay: new Date(e.value as Date)
                          .toISOString()
                          .split("T")[0],
                      }))
                    }
                    containerSpan="col-span-3"
                  />
                  <InputGroup
                    inputType="button"
                    name="submit"
                    value={""}
                    buttonIcon="pi-plus"
                    onButtonClick={setNewVacations}
                    containerSpan="col-span-1"
                  />
                  <DataTable
                    className="col-span-full rounded-md p-0"
                    stripedRows
                    selectionMode="single"
                    title="Vacations"
                    rows={5}
                    rowsPerPageOptions={[5, 10, 15, 20]}
                    value={form.vacations.map((e) => {
                      return e;
                    })}
                    // onRowDoubleClick={(e) => console.log(e)}
                    onCellClick={() => console.log("xd")}
                  >
                    <Column body={(x: Vacations, d) => deleteRowButton(x, d)} />
                    <Column header="Start V. day" field="startVacationDay" />
                    <Column header="End V. day" field="endVacationDay" />
                    <Column header="Days" field="days" />
                  </DataTable>
                </div>
              </div>
            </div>
            <InputGroup
              inputType="button"
              name="submit"
              value={"Update"}
              onButtonClick={updateUser}
              containerSpan={"1"}
            />
          </Dialog>

          {/* Modal to create user */}
          <Dialog
            visible={modal}
            onHide={() => setModal(false)}
            header="Create User"
            className="w-1/3"
          >
            <div className="grid grid-cols-8 gap-x-2">
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
                containerSpan="col-span-4"
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
                containerSpan="col-span-4"
              />
              <InputGroup
                inputType="text"
                label="First Name"
                name="name"
                placeholder="David"
                value={form.name}
                onChange={(e) =>
                  onChange(e.target.value, e.target.id as keyof UserPlainData)
                }
                containerSpan="col-span-4"
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
                containerSpan="col-span-4"
              />
              <InputGroup
                inputType="text"
                label="Surname"
                name="lastname"
                placeholder="Castro"
                value={form.lastname}
                onChange={(e) =>
                  onChange(e.target.value, e.target.id as keyof UserPlainData)
                }
                containerSpan="col-span-4"
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
                containerSpan="col-span-4"
              />
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
                containerSpan="col-span-5"
              />
              <InputGroup
                inputType="dropdown"
                label="Payroll"
                name="payroll"
                placeholder="Yes"
                value={form.payroll}
                options={["Yes", "No"]}
                onDropDownChange={(e) =>
                  onChange(
                    e.value as string,
                    e.target.id as keyof UserPlainData
                  )
                }
                containerSpan="col-span-3"
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
                containerSpan="col-span-full"
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
                containerSpan="col-span-full"
              />
              <Button
                label="Create User"
                className="col-span-full"
                onClick={AddUser}
              />
            </div>
          </Dialog>
        </div>
      )}
    </>
  );
}
export async function HumanResourcesLoader(): Promise<HumanResourcesLoader> {
  const users: userSignUpData[] = await GetUsers();
  return {
    users,
  };
}
