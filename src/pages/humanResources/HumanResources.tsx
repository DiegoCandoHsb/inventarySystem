/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Button } from "primereact/button";
import { Column, ColumnBodyOptions } from "primereact/column";
import { DataTable, DataTableRowClickEvent } from "primereact/datatable";
import {
  GetUsers,
  UpdateUser,
  uploadUsersFile,
} from "../../services/user.service";
import {
  UserPlainData,
  defaultUserData,
  userSignUpData,
} from "../../interfaces/userSignUpData.interface";
import { useLoaderData } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
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
import {
  exportUsersToXlsx,
  inputErrors,
} from "../fixedAssets/common/utilities";
import LoadSpinner from "../../components/LoadSpinner";
import { FileUploadHandlerEvent } from "primereact/fileupload";

export default function HumanResources() {
  const [users, setUsers] = useState<userSignUpData[]>(
    (useLoaderData() as HumanResourcesLoader).users
  );

  const [modal, setModal] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);

  // filtro global
  const [globalFilterValue, setGlobalFilterValue] = useState("");

  const [aviableForVacations, setAviableForVacations] =
    useState<boolean>(false);

  const { form, onChange, setState } = useForm<UserPlainData>(defaultUserData);

  const currentDate = new Date().toISOString().split("T")[0];
  const [dates, setDates] = useState<Vacations>({
    startVacationDay: currentDate,
    endVacationDay: currentDate,
    days: 0,
  });

  const vacationsRef = useRef<HTMLHeadingElement>(null);
  const toastRef = useRef<Toast>(null);

  useEffect(() => {
    checkAdmissionDate();
  }, [form]);

  function checkAdmissionDate(): boolean {
    if (!form.admissionDate) {
      setAviableForVacations(false);
      return false;
    } else {
      // const admissionDate = new Date(form.admissionDate).getTime();
      // const actDate = new Date().getTime();
      // 31557600000
      // const diference = actDate - admissionDate;
      // if (diference >= 31557600000) {
      // setAviableForVacations(true);
      // return true;
      // }
      setAviableForVacations(true);
      return true;
    }
  }

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
    console.log("Xd");
    if (!checkAdmissionDate()) return;
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
        admissionDate: form.admissionDate,
      },
      active: form.active,
    };
    UpdateUser(form.id, userTransformedData)
      .then((data) => {
        setEdit(false);
        return data;
      })
      .catch((err) => console.log(err))
      .finally(async () => await setNewUser());
  }

  function deleteRowButton(_: Vacations, column: ColumnBodyOptions) {
    return (
      <InputGroup
        inputType="button"
        name="Delete"
        value=""
        buttonIcon="pi-times"
        containerCls="px-1"
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

  function toggleElement(elm: React.RefObject<HTMLHeadingElement>): string {
    if (!aviableForVacations) return "not aviable";

    const nextElement = elm.current?.nextElementSibling;

    const elmClasses = [...(nextElement?.classList as unknown as string[])];
    if (!aviableForVacations) {
      console.log("xd");
      nextElement?.classList.add("hidden");
    }

    if (elmClasses.includes("hidden")) {
      nextElement?.classList.remove("hidden");
      return "xd";
    }
    nextElement?.classList.add("hidden");

    return "done";
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
              header={
                <TableHeaderComponent
                  headerTitle="Human Resources"
                  export
                  setGlobalFilter={setGlobalFilterValue}
                  exportFun={() => {
                    if (users) {
                      exportUsersToXlsx(users, "Users");
                      return;
                    }
                  }}
                  importFun={({ files: [file] }: FileUploadHandlerEvent) => {
                    const formData = new FormData();
                    formData.append("file", file);
                    uploadUsersFile(formData)
                      .then(async (res) => {
                        console.log(res);
                        await setNewUser();
                        return;
                      })
                      .catch((err) => console.log(err));
                  }}
                />
              }
              stripedRows
              value={users ?? []}
              emptyMessage={"No Users found"}
              selectionMode="single"
              title="Human Resources"
              onRowDoubleClick={(e) => {
                updateModal(e);
              }}
              paginator
              rows={25}
              rowsPerPageOptions={[25, 50, 75, 100]}
              sortField="active"
              sortOrder={-1}
              globalFilterFields={["id", "name", "email"]}
              globalFilter={globalFilterValue}
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
                body={(user) => {
                  const userFullName: string = user.name.concat(
                    " ",
                    user.details.secondname,
                    " ",
                    user.details.lastname,
                    " ",
                    user.details.secondlastname
                  );

                  return userFullName;
                }}
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
                containerCls="items-center mb-auto"
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
              <InputGroup
                inputType="text"
                label="Password"
                name="password"
                value={form.password}
                onChange={(e) =>
                  onChange(e.target.value, e.target.id as keyof UserPlainData)
                }
                containerSpan="col-span-3"
              />
              <InputGroup
                inputType="dropdown"
                placeholder="Yes"
                name="payroll"
                value={form.payroll}
                options={["Yes", "No"]}
                onDropDownChange={(e) =>
                  onChange(
                    e.value as string,
                    e.target.id as keyof UserPlainData
                  )
                }
                containerSpan="2"
              />
              <InputGroup
                inputType="date"
                label="Admission Date"
                name="admissionDate"
                value={form.admissionDate}
                containerSpan="col-span-4"
                onDateChange={(e) =>
                  onChange(
                    new Date(e.value as Date).toISOString().split("T")[0],
                    e.target.name as keyof UserPlainData
                  )
                }
              />

              {/* vacations */}
              <div className="bg-level-3 col-span-full rounded-md shadow-md shadow-zinc-500">
                <h1
                  className="w-full text-2xl font-bold text-center bg-level-2 mx-auto py-2 cursor-pointer"
                  ref={vacationsRef}
                  onClick={() => toggleElement(vacationsRef)}
                >
                  Vacations
                </h1>
                <div
                  className={`col-span-full grid grid-cols-7 gap-2 rounded-md p-2 ${
                    !aviableForVacations ? "hidden" : "block"
                  }`}
                >
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
                    emptyMessage={
                      <h1 className="p-2 ml-2 ">No vacations found</h1>
                    }
                    className="col-span-full rounded-md p-0 max-h-64 overflow-auto"
                    stripedRows
                    selectionMode="single"
                    title="Vacations"
                    rows={5}
                    rowsPerPageOptions={[5, 10, 15, 20]}
                    value={form.vacations.map((e) => {
                      return e;
                    })}
                    onCellClick={() => console.log("xd")}
                  >
                    <Column
                      body={(x: Vacations, d) => deleteRowButton(x, d)}
                      align={"center"}
                    />
                    <Column
                      header="Start V. day"
                      field="startVacationDay"
                      align={"center"}
                    />
                    <Column
                      header="End V. day"
                      field="endVacationDay"
                      align={"center"}
                    />
                    <Column header="Days" field="days" align="center" />
                    <Column header="Rem Days" field="days" align={"center"} />
                  </DataTable>

                  {/* :value */}
                  <div className="bg-level-2 flex col-span-3 px-1 gap-1 rounded-md">
                    <InputGroup
                      inputType="text"
                      label="Add days"
                      name=""
                      value={""}
                      containerSpan="col-start-2 col-span-2"
                      inputCls="text-end"
                    />
                    <InputGroup
                      inputType="button"
                      name=""
                      value={""}
                      buttonIcon="pi pi-plus"
                      containerSpan="col-start-1 col-span-1"
                    />
                  </div>
                  <InputGroup
                    inputType="text"
                    label="Total V. Days"
                    disabled
                    name=""
                    value={"123"}
                    containerSpan="col-start-4 col-span-2"
                    inputCls="text-end"
                  />
                  <InputGroup
                    inputType="text"
                    label="Taken days"
                    disabled
                    name=""
                    value={"123"}
                    containerSpan="col-start-6 col-span-2 border-t-2 border-gray-400"
                    inputCls="text-end"
                  />
                  <InputGroup
                    inputType="text"
                    label="Total Added D."
                    disabled
                    name=""
                    value={"123"}
                    containerSpan="col-start-1 col-span-2"
                    inputCls="text-end"
                  />
                  <InputGroup
                    inputType="text"
                    label="Total"
                    disabled
                    name=""
                    value={"123"}
                    containerSpan="col-start-6 col-span-2"
                    inputCls="text-end"
                  />
                </div>
              </div>
            </div>
            <InputGroup
              inputType="button"
              name="submit"
              value={"Update User"}
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
