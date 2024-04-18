import { JWT } from "google-auth-library";
import credentials from "../../../credentials.json";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { config } from "./../config";

import { google } from "googleapis";

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

export async function getFileData(
  folderId = "1iqdlnsv1XztuhHgoAF8fe6uGIOj4es8h"
) {
  try {
    /*const auth = new google.auth.GoogleAuth({
      keyFile: "./credentials.json",
      scopes: ["https://www.googleapis.com/auth/drive"],
    });*/

    const auth = new JWT({
      email: credentials.client_email,
      key: credentials.private_key,
      scopes: ["https://www.googleapis.com/auth/drive"],
    });

    const drive = google.drive({ version: "v3", auth });

    const query = {
      q: `'${folderId}' in parents`,
      fields: "files(id, name)",
    };

    const response = await drive.files.list(query);
    console.log(response.data.files);

    return response.data.files?.filter((file) =>
      file.name?.includes("EMPLEADO_")
    );
  } catch (error) {
    console.log("ERR -----> ", error);
  }
}
