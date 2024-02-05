import { Card } from "primereact/card";
import { FormatedAssetData } from "../interfaces/asset.interface";
import { AssetConfig } from "../config/assets.config";

interface props {
  data: FormatedAssetData[] | number;
}

export default function TotalDepreciationCard({ data }: props) {
  return (
    <div className="w-full flex justify-center my-3">
      <Card className="w-1/2 bg-level-2">
        <div className="flex justify-evenly">
          <h1 className="bg-level-1 p-2 rounded-md font-bold">
            Total Annual Depreciation:{" "}
            <span className="font-normal">
              {typeof data !== "number"
                ? data
                    .map((asset) => asset.details.annualDepreciation)
                    .reduce((x, y) => x + y, 0)
                    .toFixed(AssetConfig.decimalQuantity)
                : 0}
            </span>
          </h1>
          <h1 className="bg-level-1 p-2 rounded-md font-bold">
            Total Monthly Depreciation:{" "}
            <span className="font-normal">
              {typeof data !== "number"
                ? data
                    .map((asset) => asset.details.monthlyDepreciation)
                    .reduce((x, y) => x + y, 0)
                    .toFixed(AssetConfig.decimalQuantity)
                : 0}
            </span>
          </h1>
        </div>
      </Card>
    </div>
  );
}
