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
import { useState } from "react";
import { HumanResourcesLoader } from "../../interfaces/humanResLoader.interface";
import { Dialog } from "primereact/dialog";
import { useForm } from "../../hooks/useForm";

export default function HumanResources() {
  const [users] = useState<userSignUpData[]>(
    (useLoaderData() as HumanResourcesLoader).users
  );

  const [modal, setModal] = useState<boolean>(false);

  function updateModal(e: DataTableRowClickEvent) {
    console.log(e.data);
    setModal(true);
  }

  const { id } = useForm<UserPlainData>(defaultUserData);

  return (
    <div>
      <div className="m-5">
        <Button label="Add" />
        <DataTable
          className="shadow-md"
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
      </div>
      {/* modal to update user */}
      <Dialog
        visible={modal}
        onHide={() => setModal(false)}
        header="Edit User"
        className="w-2/5"
      ></Dialog>
    </div>
  );
}

export async function HumanResourcesLoader(): Promise<HumanResourcesLoader> {
  const users: userSignUpData[] = await GetUsers();

  return {
    users,
  };
}
