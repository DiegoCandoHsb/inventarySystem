import { DataTable } from "primereact/datatable";
import { ButtonComponent } from "../../components/Auth-Components/ButtonComponent";
import useAssetForm from "../../hooks/useAssetForm";
import { AssetPlainData, defaultAssetData } from "../../interfaces/asset.interface";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import InputGroup from "../../components/InputGroup";
import { AssetActive, ExpensesStatus } from "../../interfaces/enums/assetActive";
import { AssetTypeConfig } from "../../config/assets.config";

const Expenses = () => {
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
    updateModal,
  } = useAssetForm();

  return (
    <div>
      <div className="w-12">
        <ButtonComponent
          title="Add"
          onclickButton={() => {
            setModal(true);
            setEdit(false);
            setState(defaultAssetData);
            setFormSettings((curretValues) => ({
              ...curretValues,
              submitButtonValue: curretValues.defaultSettings.submitButtonValue,
            }));
          }}
        />
      </div>
      {/* table */}
      <div className="card">
        <DataTable
          className="m-5 shadow-md"
          value={
            assets.expensesAssets &&
            assets.expensesAssets.map((asset) => {
              for (
                let i = 0;
                i < (assets.users ? assets.users.length : 1);
                i++
              ) {
                if (asset.details.responsible === assets.users![i].id) {
                  asset.details.responsibleName = assets.users![i].name;
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
          rows={25}
          rowsPerPageOptions={[25, 50, 75, 100]}
          tableStyle={{ minWidth: "50rem" }}
        >
          <Column header="ID" field="id" style={{ width: "15%" }}></Column>
          <Column header="Name" field="name" style={{ width: "15%" }}></Column>
          <Column
            header="Acq. Date"
            field="purchaseDate"
            style={{ width: "15%" }}
          ></Column>
          <Column
            header="Brand"
            field="details.brand"
            style={{ width: "15%" }}
          ></Column>
          <Column
            header="value"
            field="details.value"
            style={{ width: "15%" }}
          ></Column>
          <Column
            header="Supplier"
            field="details.supplier"
            style={{ width: "15%" }}
          ></Column>
          <Column
            header="Responsible"
            field="details.responsibleName"
            style={{ width: "15%" }}
          ></Column>
          <Column
            header="State"
            field="details.active"
            style={{ width: "15%" }}
          ></Column>
        </DataTable>
      </div>
      {/* Dialog */}
      <Dialog
        header="Create Asset"
        draggable={false}
        visible={modal}
        className="w-1/3"
        onHide={() => setModal(false)}
      >
        <InputGroup
          inputType="text"
          label="Name"
          name="name"
          placeholder="Pc"
          value={form.name}
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
          inputType="dropdown"
          label="Status"
          name="active"
          placeholder="using"
          value={form.active}
          options={Object.values(AssetActive)}
          onDropDownChange={(e) =>
            onChange(e.value as string, e.target.id as keyof AssetPlainData)
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
          inputType="textarea"
          label="Observations"
          name="observation"
          value={form.observation}
          onChange={(e) =>
            onChange(e.target.value, e.target.id as keyof AssetPlainData)
          }
        />
        <ButtonComponent
          reference={submitButtonRef}
          title={formSettings.submitButtonValue}
          onclickButton={createOrEditAsset}
        />
      </Dialog>
    </div>
  );
};

export default Expenses;
