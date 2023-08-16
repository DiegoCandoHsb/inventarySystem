/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
import { Dialog } from "primereact/dialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import {
  AssetPlainData,
  defaultAssetData,
} from "../../interfaces/asset.interface";
import "../../services/asset.service";
import { AssetActive } from "../../interfaces/enums/assetActive";
import { AssetTypeConfig } from "../../config/assets.config";
import InputGroup from "../../components/InputGroup";
import useAssetForm from "../../hooks/useAssetForm";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import TableHeaderComponent from "../../components/TableHeaderComponent";

export default function ElectronicEquipment() {
  const assetName = "electronicEquipmentAssets";
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
  } = useAssetForm();

  function calculateDepreTime(date: string) {
    const acDate = new Date(date);
    const current = new Date();

    const dateBeforeDepre = acDate.setMonth(acDate.getMonth() + 58);

    if (Number(current) >= Number(dateBeforeDepre)) return true;
    return false;
  }
  console.log(assets);
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
          className="shadow-md"
          header={<TableHeaderComponent headerTitle="Electronic Equipment" />}
          value={
            assets[assetName] &&
            assets[assetName].map((asset) => {
              for (
                let i = 0;
                i < (assets.users ? assets.users.length : 1);
                i++
              ) {
                if (asset.details.responsible === assets.users![i].id) {
                  asset.details.responsibleName = assets.users![i].name.concat(
                    " ",
                    assets.users![i].details.secondname,
                    " ",
                    assets.users![i].details.lastname,
                    " ",
                    assets.users![i].details.secondlastname
                  );
                }
              }

              return asset;
            })
          }
          emptyMessage={"No Assets found"}
          selectionMode="single"
          title="Electronic Equipments"
          onRowDoubleClick={(e) => updateModal(e)}
          paginator
          filters={{}}
          rows={25}
          rowsPerPageOptions={[25, 50, 75, 100]}
          tableStyle={{
            minWidth: "50rem",
          }}
          cellClassName={(_, { ...data }) => {
            const depre = calculateDepreTime(
              data.props.value![data.rowIndex].purchaseDate
            );
            return depre ? "bg-warning" : "";
          }}
          stripedRows
        >
          <Column header="ID" field="id" style={{ width: "5%" }}></Column>
          <Column
            header="Item Name"
            field="name"
            style={{ width: "15%" }}
          ></Column>
          <Column
            header="Acq. Date"
            field="purchaseDate"
            style={{ width: "10%" }}
          ></Column>
          <Column
            header="Brand"
            field="details.brand"
            style={{ width: "15%" }}
          ></Column>
          <Column
            header="Monthly Dep."
            field="details.monthlyDepreciation"
            style={{ width: "10" }}
          ></Column>
          <Column
            header="Val. Books"
            field="details.valueBooks"
            style={{ width: "10" }}
          ></Column>
          <Column
            header="Insured"
            field="details.insured"
            style={{ width: "15" }}
          ></Column>
          <Column
            header="Responsible"
            field="details.responsibleName"
            style={{ width: "15" }}
          ></Column>
        </DataTable>
      </section>
      {/* total depreciation */}
      <div className="w-full  flex justify-center my-3">
        <Card className="w-1/2 bg-level-2">
          <div className="flex justify-evenly">
            <h1 className="bg-level-1 p-2 rounded-md font-bold">
              Total Annual Depreciation:{" "}
              <span className="font-normal">
                {assets[assetName]
                  ? assets[assetName]
                      .map((asset) => asset.details.annualDepreciation)
                      .reduce((x, y) => x + y, 0)
                      .toFixed(formSettings.decialQuiantity)
                  : 0}
              </span>
            </h1>
            <h1 className="bg-level-1 p-2 rounded-md font-bold">
              Total Monthly Depreciation:{" "}
              <span className="font-normal">
                {assets[assetName]
                  ? assets[assetName]
                      .map((asset) => asset.details.monthlyDepreciation)
                      .reduce((x, y) => x + y, 0)
                      .toFixed(formSettings.decialQuiantity)
                  : 0}
              </span>
            </h1>
          </div>
        </Card>
      </div>
      {/* modal */}
      <Dialog
        header="Create Asset"
        visible={modal}
        className="w-1/3"
        onHide={() => setModal(false)}
      >
        <InputGroup
          inputType="text"
          label="Item Name"
          name="name"
          placeholder="Pc"
          value={form.name}
          onChange={(e) =>
            onChange(e.target.value, e.target.id as keyof AssetPlainData)
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
              e.target.id as keyof AssetPlainData
            );
          }}
        />
        <InputGroup
          inputType="text"
          label="Serial Number"
          name="serialNumber"
          placeholder="123ADS23LK1"
          value={form.serialNumber}
          onChange={(e) =>
            onChange(e.target.value, e.target.id as keyof AssetPlainData)
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
            onChange(e.value as string, e.target.id as keyof AssetPlainData)
          }
        />
        <InputGroup
          inputType="text"
          label="Model"
          name="model"
          placeholder=""
          value={form.model}
          onChange={(e) =>
            onChange(e.target.value, e.target.id as keyof AssetPlainData)
          }
        />
        <InputGroup
          inputType="text"
          label="Color"
          name="color"
          placeholder="Red"
          value={form.color}
          onChange={(e) =>
            onChange(e.target.value, e.target.id as keyof AssetPlainData)
          }
        />
        <InputGroup
          inputType="dropdown"
          label="Responsible"
          name="responsible"
          placeholder="Michael Ortiz"
          value={form.responsible}
          options={assets.users}
          optionLabel={"name"}
          optionValue={"id"}
          onDropDownChange={(e) =>
            onChange(e.value as string, e.target.id as keyof AssetPlainData)
          }
        />
        <InputGroup
          inputType="text"
          label="Supplier"
          name="supplier"
          placeholder="Gato"
          value={form.supplier}
          onChange={(e) => {
            console.log(e.target.id);
            onChange(e.target.value, e.target.id as keyof AssetPlainData);
          }}
        />
        <InputGroup
          inputType="decimal"
          label="Value"
          name="value"
          placeholder="120.50"
          value={form.value}
          decimalQuliantity={2} // Setting
          onNumberChange={(e) => {
            console.log();
            onChange(
              e.value as number,
              (e.originalEvent.target as HTMLInputElement)
                .name as keyof AssetPlainData
            );
          }}
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
                .name as keyof AssetPlainData
            )
          }
        />
        <InputGroup
          inputType="number"
          label="Residual Value"
          name="residualValue"
          placeholder="0"
          value={form.residualValue}
          disabled={true}
          onNumberChange={(e) =>
            onChange(
              e.value as number,
              (e.originalEvent.target as HTMLInputElement)
                .name as keyof AssetPlainData
            )
          }
        />
        <InputGroup
          inputType="decimal"
          label="Annual Depreciation"
          name="annualDepreciation"
          placeholder="0"
          value={form.annualDepreciation}
          decimalQuliantity={2}
          disabled={true}
          onNumberChange={(e) =>
            onChange(
              e.value as number,
              (e.originalEvent.target as HTMLInputElement)
                .name as keyof AssetPlainData
            )
          }
        />
        <InputGroup
          inputType="decimal"
          label="Monthly Depreciation"
          name="monthlyDepreciation"
          placeholder="0"
          value={form.monthlyDepreciation}
          decimalQuliantity={2}
          disabled={true}
          onNumberChange={(e) =>
            onChange(
              e.value as number,
              (e.originalEvent.target as HTMLInputElement)
                .name as keyof AssetPlainData
            )
          }
        />
        <InputGroup
          inputType="decimal"
          label="value in books"
          name="monthlyDepreciation"
          placeholder="0"
          value={form.valueBooks}
          decimalQuliantity={2}
          disabled={true}
          onNumberChange={(e) =>
            onChange(
              e.value as number,
              (e.originalEvent.target as HTMLInputElement)
                .name as keyof AssetPlainData
            )
          }
        />
        <InputGroup
          inputType="decimal"
          label="Insured"
          name="insured"
          placeholder="0"
          value={form.insured}
          decimalQuliantity={2}
          onNumberChange={(e) =>
            onChange(
              e.value as number,
              (e.originalEvent.target as HTMLInputElement)
                .name as keyof AssetPlainData
            )
          }
        />
        <InputGroup
          inputType="dropdown"
          label="Type"
          name="assetType"
          placeholder="Select asset type"
          value={form.assetType}
          options={Object.values(AssetTypeConfig)}
          onDropDownChange={(e) =>
            onChange(e.value as string, e.target.id as keyof AssetPlainData)
          }
        />
        <InputGroup
          inputType="dropdown"
          label="Status"
          name="active"
          placeholder="new"
          value={form.active}
          options={Object.values(AssetActive)}
          onDropDownChange={(e) =>
            onChange(e.value as string, e.target.id as keyof AssetPlainData)
          }
        />
        <InputGroup
          inputType="textarea"
          label="Observations"
          name="observation"
          value={form.observation}
          onChange={(e) =>
            onChange(e.target.value, e.target.id as keyof AssetPlainData)
          }
        />
        {/* otros */}
        <div className="w-full flex justify-center mt-5">
          <Button
            ref={() => submitButtonRef}
            label={formSettings.submitButtonValue}
            onClick={createOrEditAsset}
            className="w-full"
          />
        </div>
      </Dialog>
    </div>
  );
}
