/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
import { Dialog } from "primereact/dialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import {
  FormatedAssetData,
  PlainAssetData,
  defaultAssetData,
} from "../../interfaces/asset.interface";
import "../../services/asset.service";
import { AssetState } from "../../interfaces/enums/assetActive";
import { AssetConfig, AssetTypeConfig } from "../../config/assets.config";
import InputGroup from "../../components/InputGroup";
import useAssetForm from "../../hooks/useAssetForm";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import TableHeaderComponent from "../../components/TableHeaderComponent";
import { exportToXlsx, numValCell } from "./common/utilities";
import TotalDepreciationCard from "../../components/TotalDepreciationCard";
import LoadSpinner from "../../components/LoadSpinner";
import { useEffect } from "react";

export default function ElectronicEquipment() {
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
  } = useAssetForm();

  function calculateDepreTime(date: string) {
    const acDate = new Date(date);
    const current = new Date();

    const dateBeforeDepre = acDate.setMonth(acDate.getMonth() + 58);

    if (Number(current) >= Number(dateBeforeDepre)) return true;
    return false;
  }

  return (
    <>
      {!assets ? (
        <LoadSpinner />
      ) : (
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
                  headerTitle="Electronic Equipment"
                  export
                  // fun={() => exportCSV(false, dataTableRef)}
                  fun={() => {
                    if (assets.assets?.length) {
                      return exportToXlsx(
                        assets.assets,
                        AssetConfig.electronicEquipment
                      );
                    }
                  }}
                />
              }
              value={
                assets.assets &&
                assets.assets.map((asset) => {
                  for (
                    let i = 0;
                    i < (assets.users ? assets.users.length : 1);
                    i++
                  ) {
                    if (asset.details.responsible === assets.users![i].id) {
                      asset.details.responsibleName = assets.users![
                        i
                      ].name.concat(
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
              // filters={{}}
              rows={25}
              rowsPerPageOptions={[25, 50, 75, 100]}
              tableStyle={{
                minWidth: "50rem",
              }}
              rowClassName={(data) => {
                // console.log(data);
                const depre = calculateDepreTime(data.purchaseDate);
                // return depre ? "bg-warning" : "";
                return {
                  "bg-warning": depre === true,
                };
              }}
              stripedRows
              size="small"
            >
              <Column
                header="ID"
                field="id"
                body={(_, opt) => opt.rowIndex + 1}
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
                field="details.unitValue"
                body={(data: FormatedAssetData) =>
                  numValCell(data.details.unitValue)
                }
                align="right"
                alignHeader="center"
                sortable
              ></Column>
              <Column
                header="Monthly Dep."
                field="details.monthlyDepreciation"
                body={(data: FormatedAssetData) =>
                  numValCell(data.details.monthlyDepreciation)
                }
                align="right"
                alignHeader="center"
                sortable
              ></Column>
              <Column
                header="Val. Books"
                field="details.valueBooks"
                body={(data: FormatedAssetData) =>
                  numValCell(data.details.valueBooks)
                }
                align="right"
                alignHeader="center"
                sortable
              ></Column>
              <Column
                header="Insured"
                field="details.insured"
                body={(data: FormatedAssetData) =>
                  numValCell(data.details.insured || 0)
                }
                align="right"
                alignHeader="center"
                sortable
              ></Column>
              <Column
                header="Responsible"
                field="details.responsibleName"
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
            modal
            onHide={() => setModal(false)}
          >
            <InputGroup
              inputType="text"
              label="Code"
              name="code"
              placeholder="EE000"
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
              label="Inches"
              name="inches"
              placeholder='19"'
              value={form.inches || ""}
              onChange={(e) =>
                onChange(e.target.value, e.target.id as keyof PlainAssetData)
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
              label="Processor"
              name="processor"
              placeholder="i7 9700"
              value={form.processor || ""}
              onChange={(e) =>
                onChange(e.target.value, e.target.id as keyof PlainAssetData)
              }
            />
            <InputGroup
              inputType="text"
              label="Speed (GHz)"
              name="speed"
              placeholder="4.1 GHz"
              value={form.speed || ""}
              onChange={(e) =>
                onChange(e.target.value, e.target.id as keyof PlainAssetData)
              }
            />
            <InputGroup
              inputType="text"
              label="Ram (GB)"
              name="ram"
              placeholder="16 GB"
              value={form.ram || ""}
              onChange={(e) =>
                onChange(e.target.value, e.target.id as keyof PlainAssetData)
              }
            />
            <InputGroup
              inputType="text"
              label="HDD (GB)"
              name="hdd"
              placeholder="1025 GB"
              value={form.hdd || ""}
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
              label="Kit Value"
              name="kitValue"
              placeholder="120.50"
              value={form.kitValue || ""}
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
              placeholder="Michael Ortiz"
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
              value={form.state}
              options={Object.values(AssetState)} // TODO: DB
              onDropDownChange={(e) =>
                onChange(e.value as string, e.target.id as keyof PlainAssetData)
              }
            />
            <InputGroup
              inputType="dropdown"
              label="Active"
              name="active"
              placeholder="Active"
              value={form.active}
              options={["Active", "Inactive"]} // TODO: DB
              onDropDownChange={(e) =>
                onChange(e.value as string, e.target.id as keyof PlainAssetData)
              }
            />
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
              value={form.ubication}
              options={["item1", "item2"]} // TODO: DB
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

            <div className="w-full flex justify-center mt-5">
              <Button
                ref={() => submitButtonRef}
                label={formSettings.submitButtonValue}
                onClick={() =>
                  createOrEditAsset(AssetTypeConfig.ElectronicEquipment)
                }
                className="w-full"
              />
            </div>
          </Dialog>
        </div>
      )}
    </>
  );
}
