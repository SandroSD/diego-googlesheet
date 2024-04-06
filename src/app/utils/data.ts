import { JWT } from "google-auth-library";
import credentials from "../../../data";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { config } from "./../config";

export async function getData(): Promise<
  | {
      empleados: { label: string; value: string }[];
      meses: { label: string; value: string }[];
    }
  | undefined
> {
  try {
    const token = new JWT({
      email: credentials.client_email,
      key: credentials.private_key,
      scopes: [
        "https://www.googleapis.com/auth/spreadsheets",
        "https://www.googleapis.com/auth/drive.file",
      ],
    });

    const document = new GoogleSpreadsheet(
      config.googleSpreadSheet.dbGooglesheetId,
      token
    );

    await document.loadInfo();

    const empleadosSheet = document.sheetsByIndex[0];

    const employees = await empleadosSheet.getRows();

    const mesesSheet = document.sheetsByIndex[1];

    const months = await mesesSheet.getRows();

    return {
      empleados: employees.map((row) => {
        const data = row.get("NOMBRE Y APELLIDO");
        return {
          label: data,
          value: data,
        };
      }),
      meses: months.map((row) => {
        const data = row.get("NOMBRE");
        return {
          label: data,
          value: data,
        };
      }),
    };
  } catch (error) {
    console.log("ERROR TRYNG TO GET DATA. ", error);
  }
}
