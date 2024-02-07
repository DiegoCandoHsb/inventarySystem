import { Toast } from "primereact/toast";
import useAssetForm from "../../hooks/useAssetForm";
import { Button } from "primereact/button";
import {
  FormatedAssetData,
  PlainAssetData,
  defaultAssetData,
} from "../../interfaces/asset.interface";
import { DataTable } from "primereact/datatable";
import TableHeaderComponent from "../../components/TableHeaderComponent";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import InputGroup from "../../components/InputGroup";
import { AssetConfig, AssetTypeConfig } from "../../config/assets.config";
import { AssetState } from "../../interfaces/enums/assetActive";
import { exportToXlsx, numValCell } from "./common/utilities";
import TotalDepreciationCard from "../../components/TotalDepreciationCard";
import { getEspecificAssets, uploadFile } from "../../services/asset.service";
import { FileUploadHandlerEvent } from "primereact/fileupload";

export default function FurnitureAndFixtures() {
  const {
    assets,
    createOrEditAsset,
    form,
    formSettings,
    modal,
    onChange,
    setEdit,
    setFormSettings,
    setModal,
    setState,
    submitButtonRef,
    toastRef,
    updateModal,
    dataTableRef,
    setNewAssetsData,
    filters,
    setFilters,
  } = useAssetForm();

  function calculateDepreTime(date: string) {
    const acDate = new Date(date);
    const current = new Date();

    const dateBeforeDepre = acDate.setMonth(acDate.getMonth() + 58);

    if (Number(current) >= Number(dateBeforeDepre)) return true;
    return false;
  }

  return (
    <div>
      <Toast ref={toastRef} position="top-right" />
      {/* table */}
      <section className="mx-2">
        <div className="my-5">
          <Button
            label="Add"
            onClick={() => {
              setModal(true);
              AssetConfig.setDialogHeaderTitle("create");
              setEdit(false);
              setState(defaultAssetData);
              setFormSettings((curretValues) => ({
                ...curretValues,
                submitButtonValue:
                  curretValues.defaultSettings.submitButtonValue,
              }));
            }}
          />
        </div>

        <DataTable
          ref={dataTableRef}
          className="shadow-md"
          header={
            <TableHeaderComponent
              setGlobalFilter={setFilters}
              headerTitle="Furniture and Fixtures"
              export
              exportFun={() => {
                if (assets.assets?.length) {
                  return exportToXlsx(
                    assets.assets,
                    AssetConfig.furnitureAndFixture
                  );
                }
              }}
              importFun={({ files: [file] }: FileUploadHandlerEvent) => {
                const formData = new FormData();
                formData.append("file", file);

                uploadFile(formData)
                  .then(async (res) => {
                    console.log(res);
                    const xd = await getEspecificAssets(
                      AssetTypeConfig.ElectronicEquipment
                    );
                    console.log("este es el llamado al back: ", xd);

                    await setNewAssetsData(
                      AssetTypeConfig.FurnitureAndFixtures
                    );
                  })
                  .catch((err) => console.log(err));
              }}
            />
          }
          exportFilename={AssetConfig.furnitureAndFixture}
          value={assets.assets}
          emptyMessage={"No Assets found"}
          selectionMode="single"
          onRowDoubleClick={(e) => updateModal(e)}
          paginator
          rows={25}
          rowsPerPageOptions={[25, 50, 75, 100]}
          tableStyle={{
            minWidth: "50rem",
          }}
          rowClassName={(data) => {
            const depre = calculateDepreTime(data.purchaseDate);
            return {
              "bg-warning": depre,
            };
          }}
          stripedRows
          size="small"
          globalFilterFields={[
            "itemName",
            "details.brand",
            "details.responsible",
            "details.ubication",
            "details.code",
          ]}
          globalFilter={filters}
        >
          <Column
            header="Code"
            field="details.code"
            align="center"
            alignHeader="center"
            sortable
          ></Column>
          <Column
            header="Item Name"
            field="itemName"
            align="center"
            alignHeader="center"
            sortable
          ></Column>
          <Column
            header="Acq. Date"
            field="purchaseDate"
            align="center"
            alignHeader="center"
            sortable
          ></Column>
          <Column
            header="Brand"
            field="details.brand"
            align="center"
            alignHeader="center"
            sortable
          ></Column>
          <Column
            header="Purchase Value"
            field="details.value"
            body={(e: FormatedAssetData) => numValCell(e.details.unitValue)}
            align="right"
            alignHeader="center"
            sortable
          ></Column>
          <Column
            header="Monthly Dep."
            field="details.monthlyDepreciation"
            body={(e: FormatedAssetData) =>
              numValCell(e.details.monthlyDepreciation)
            }
            align="right"
            alignHeader="center"
            sortable
          ></Column>
          <Column
            header="Val. Books"
            field="details.valueBooks"
            body={(e: FormatedAssetData) => numValCell(e.details.valueBooks)}
            align="right"
            alignHeader="center"
            sortable
          ></Column>
          <Column
            header="Insured"
            field="details.insured"
            body={(e: FormatedAssetData) => numValCell(e.details.insured || 0)}
            align="right"
            alignHeader="center"
            sortable
          ></Column>
          <Column
            header="Responsible"
            body={(asset: FormatedAssetData) => {
              const assetUser = assets.users?.find(
                (user) => user.id === asset.details.responsible
              );

              if (!assetUser) return "No user Found";

              return assetUser.name.concat(
                " ",
                assetUser.details.secondname,
                " ",
                assetUser.details.lastname,
                " ",
                assetUser.details.secondlastname
              );
            }}
            align="center"
            alignHeader="center"
            sortable
          ></Column>
          <Column
            header="Ubication"
            field="details.ubication"
            align="center"
            alignHeader="center"
            sortable
          ></Column>
        </DataTable>
      </section>
      {/* total depreciation */}
      <TotalDepreciationCard data={assets.assets ?? 0} />
      {/* modal */}
      <Dialog
        header={AssetConfig.defaultHeaderTitle}
        visible={modal}
        className="w-1/3"
        onHide={() => setModal(false)}
      >
        <InputGroup
          inputType="text"
          label="Code"
          name="code"
          placeholder="ME000"
          value={form.code}
          onChange={(e) =>
            onChange(e.target.value, e.target.id as keyof PlainAssetData)
          }
        />
        <InputGroup
          inputType="number"
          label="Quantity"
          name="quantity"
          placeholder="1"
          value={form.quantity}
          onNumberChange={(e) =>
            onChange(
              e.value as number,
              (e.originalEvent.target as HTMLInputElement)
                .name as keyof PlainAssetData
            )
          }
        />
        <InputGroup
          inputType="text"
          label="Item Name"
          name="itemName"
          placeholder="Pc"
          value={form.itemName}
          onChange={(e) =>
            onChange(e.target.value, e.target.id as keyof PlainAssetData)
          }
        />
        <InputGroup
          inputType="searchDropdown"
          label="Brand"
          name="brand"
          placeholder="Asus"
          value={form.brand}
          options={assets.catalog!.catalogOptions.map(
            (option) => option.catalogDetail
          )}
          onDropDownFilterChange={(e) =>
            onChange(e.value as string, e.target.id as keyof PlainAssetData)
          }
        />
        <InputGroup
          inputType="text"
          label="Model"
          name="model"
          placeholder="Gaming"
          value={form.model}
          onChange={(e) =>
            onChange(e.target.value, e.target.id as keyof PlainAssetData)
          }
        />
        <InputGroup
          inputType="text"
          label="Serial Number"
          name="serialNumber"
          placeholder="123ADS23LK1"
          value={form.serialNumber}
          onChange={(e) =>
            onChange(e.target.value, e.target.id as keyof PlainAssetData)
          }
        />
        <InputGroup
          inputType="text"
          label="Color"
          name="color"
          placeholder="Red"
          value={form.color || ""}
          onChange={(e) =>
            onChange(e.target.value, e.target.id as keyof PlainAssetData)
          }
        />
        <InputGroup
          inputType="date"
          label="Purchase Date"
          name="purchaseDate"
          placeholder="Purchase Date"
          value={form.purchaseDate}
          onDateChange={(e) => {
            onChange(
              new Date(e.value as Date).toISOString().split("T")[0],
              e.target.id as keyof PlainAssetData
            );
          }}
        />
        <InputGroup
          inputType="text"
          label="Invoice No."
          name="invoice"
          placeholder="192873"
          value={form.invoice || ""}
          onChange={(e) =>
            onChange(e.target.value, e.target.id as keyof PlainAssetData)
          }
        />
        <InputGroup
          inputType="text"
          label="Provider"
          name="provider"
          placeholder="Gato"
          value={form.provider}
          onChange={(e) => {
            onChange(e.target.value, e.target.id as keyof PlainAssetData);
          }}
        />
        <InputGroup
          inputType="decimal"
          label="Unit Value"
          name="unitValue"
          placeholder="120.50"
          value={form.unitValue}
          decimalQuliantity={2} // Setting
          onNumberChange={(e) => {
            onChange(
              e.value as number,
              (e.originalEvent.target as HTMLInputElement)
                .name as keyof PlainAssetData
            );
          }}
        />
        <InputGroup
          inputType="decimal"
          label="Total Value"
          name="totalValue"
          placeholder="0"
          value={form.totalValue}
          decimalQuliantity={AssetConfig.decimalQuantity}
          disabled={true}
          onNumberChange={(e) =>
            onChange(
              e.value as number,
              (e.originalEvent.target as HTMLInputElement)
                .name as keyof PlainAssetData
            )
          }
        />
        <InputGroup
          inputType="dropdown"
          label="Responsible"
          name="responsible"
          placeholder="Responsible Name"
          value={form.responsible}
          options={assets.users}
          optionLabel={"name"}
          optionValue={"id"}
          onDropDownChange={(e) =>
            onChange(e.value as string, e.target.id as keyof PlainAssetData)
          }
        />
        <InputGroup
          inputType="dropdown"
          label="State"
          name="state"
          placeholder="new"
          value={form.state || "new"}
          options={Object.values(AssetState)} // TODO: DB
          onDropDownChange={(e) =>
            onChange(e.value as string, e.target.id as keyof PlainAssetData)
          }
        />
        {/* <InputGroup
          inputType="dropdown"
          label="Active"
          name="active"
          placeholder="Active"
          value={form.active}
          options={["Active", "Inactive"]} // TODO: DB
          onDropDownChange={(e) =>
            onChange(e.value as string, e.target.id as keyof PlainAssetData)
          }
        /> */}
        <InputGroup
          inputType="decimal"
          label="Insured"
          name="insured"
          placeholder="0"
          value={form.insured || 0}
          decimalQuliantity={AssetConfig.decimalQuantity}
          onNumberChange={(e) =>
            onChange(
              e.value as number,
              (e.originalEvent.target as HTMLInputElement)
                .name as keyof PlainAssetData
            )
          }
        />
        {/* TYPE: Burned */}
        <InputGroup
          inputType="dropdown"
          label="Asset Location"
          name="ubication"
          placeholder="Office"
          value={form.ubication || "Office"}
          options={["Office", "Home"]} // TODO: DB
          onDropDownChange={(e) =>
            onChange(e.value as string, e.target.id as keyof PlainAssetData)
          }
        />

        <InputGroup
          inputType="number"
          label="Depreciation Time"
          name="depreciationTime"
          placeholder="10"
          value={form.depreciationTime}
          onNumberChange={(e) =>
            onChange(
              e.value as number,
              (e.originalEvent.target as HTMLInputElement)
                .name as keyof PlainAssetData
            )
          }
        />
        <InputGroup
          inputType="decimal"
          label="Residual Value"
          name="residualValue"
          placeholder="0"
          decimalQuliantity={AssetConfig.decimalQuantity}
          value={form.residualValue}
          disabled={true}
          onNumberChange={(e) =>
            onChange(
              e.value as number,
              (e.originalEvent.target as HTMLInputElement)
                .name as keyof PlainAssetData
            )
          }
        />
        <InputGroup
          inputType="decimal"
          label="Annual Depreciation"
          name="annualDepreciation"
          placeholder="0"
          value={form.annualDepreciation}
          decimalQuliantity={AssetConfig.decimalQuantity}
          disabled={true}
          onNumberChange={(e) =>
            onChange(
              e.value as number,
              (e.originalEvent.target as HTMLInputElement)
                .name as keyof PlainAssetData
            )
          }
        />
        <InputGroup
          inputType="decimal"
          label="Monthly Depreciation"
          name="monthlyDepreciation"
          placeholder="0"
          value={form.monthlyDepreciation}
          decimalQuliantity={AssetConfig.decimalQuantity}
          disabled={true}
          onNumberChange={(e) =>
            onChange(
              e.value as number,
              (e.originalEvent.target as HTMLInputElement)
                .name as keyof PlainAssetData
            )
          }
        />
        <InputGroup
          inputType="decimal"
          label="value in books"
          name="valueBooks"
          placeholder="0"
          value={form.valueBooks}
          decimalQuliantity={AssetConfig.decimalQuantity}
          disabled={true}
          onNumberChange={(e) =>
            onChange(
              e.value as number,
              (e.originalEvent.target as HTMLInputElement)
                .name as keyof PlainAssetData
            )
          }
        />

        {/* <InputGroup
          inputType="dropdown"
          label="Type"
          name="assetType"
          placeholder="Select asset type"
          value={form.assetType}
          options={Object.values(AssetTypeConfig)}
          onDropDownChange={(e) =>
            onChange(e.value as string, e.target.id as keyof PlainAssetData)
          }
        /> */}
        <InputGroup
          inputType="textarea"
          label="Observations"
          name="observation"
          value={form.observation || ""}
          onChange={(e) =>
            onChange(e.target.value, e.target.id as keyof PlainAssetData)
          }
        />
        {/* otros */}
        <div className="w-full flex justify-center mt-5">
          <Button
            ref={() => submitButtonRef}
            label={formSettings.submitButtonValue}
            onClick={() =>
              createOrEditAsset(AssetTypeConfig.FurnitureAndFixtures)
            }
            className="w-full"
          />
        </div>
      </Dialog>
    </div>
  );
}
