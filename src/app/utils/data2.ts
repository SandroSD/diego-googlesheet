import { JWT } from "google-auth-library";
import credentials from "../../../credentials.json";
import { GoogleSpreadsheet, GoogleSpreadsheetRow } from "google-spreadsheet";
import { config } from "./../config";

import { google } from "googleapis";
import { RowFileType } from "../@types/types";
class GoogleSheetClass {
  private token: JWT;

  constructor() {
    this.token = new JWT({
      email: credentials.client_email,
      key: credentials.private_key,
      scopes: [
        "https://www.googleapis.com/auth/spreadsheets",
        "https://www.googleapis.com/auth/drive.file",
        "https://www.googleapis.com/auth/drive",
      ],
    });
  }

  async loadInitialData() {
    try {
      const document = await this.getInfoFromFileById(
        config.googleSpreadSheet.dbGooglesheetId
      );

      const empleadosSheet = document.sheetsByIndex[0];
      const monthsSheet = document.sheetsByIndex[1];

      const empleados = await empleadosSheet.getRows();
      const months = await monthsSheet.getRows();

      return {
        empleados: this.prepareRowsInSelect("NOMBRE Y APELLIDO", empleados),
        meses: this.prepareRowsInSelect("NOMBRE", months),
      };
    } catch (error) {
      console.log(
        "Error trying to fetch loadInitialData: ",
        JSON.stringify(error)
      );
    }
  }

  async getFilesFromFolder(
    empleado: string,
    mes: string,
    folderId = config.googleSpreadSheet.folderProjectId
  ) {
    try {
      const drive = google.drive({ version: "v3", auth: this.token });

      const query = {
        q: `'${folderId}' in parents`,
        fields: "files(id,name)",
      };

      const response = await drive.files.list(query);

      if (response.data.files?.length === 0) {
        return;
      }

      const fileSupervisor = response.data.files?.filter((file) =>
        file.name?.includes(`SUPERVISOR_${mes}`)
      )[0];

      const fileEmpleado = response.data.files?.filter((file) =>
        file.name?.includes(`EMPLEADO_${mes}`)
      )[0];

      if (fileSupervisor === undefined) return;
      if (fileEmpleado === undefined) return;

      const [documentSupervisor, documentEmpleado] = await Promise.all([
        this.getInfoFromFileById(fileSupervisor.id as string),
        this.getInfoFromFileById(fileEmpleado.id as string),
      ]);

      const supervisorSheet = documentSupervisor.sheetsByIndex[0];
      const empleadoSheet = documentEmpleado.sheetsByIndex[0];

      const supervisorInfo = await supervisorSheet.getRows();
      const empleadoInfo = await empleadoSheet.getRows();

      const rows = this.createRowTable(supervisorInfo, empleadoInfo, empleado);

      return rows;
    } catch (error) {
      console.log(
        "Error trying to getFilesFromFolder: ",
        JSON.stringify(error)
      );
    }
  }

  private prepareRowsInSelect(name: string, rows: GoogleSpreadsheetRow[]) {
    return rows.map((row) => {
      const data = row.get(name);

      return {
        label: data,
        value: data,
      };
    });
  }

  private async getInfoFromFileById(fileId: string) {
    const googleSheetInstance = new GoogleSpreadsheet(fileId, this.token);

    await googleSheetInstance.loadInfo();

    return googleSheetInstance;
  }

  private createRowTable(
    supervisorInfo: GoogleSpreadsheetRow[],
    empleadoInfo: GoogleSpreadsheetRow[],
    empleadoSelected: string
  ) {
    const primerQuincena = [];
    const segundaQuincena = [];
    for (const row of supervisorInfo) {
      const object = row.toObject() as RowFileType;
      const [dia] = object.FECHA.split("/");

      if (object["NOMBRE TRABAJADOR"].toString() !== empleadoSelected) continue;

      const data = {
        fecha: object.FECHA,
        empleado: object["NOMBRE TRABAJADOR"],
        horaEntradaEmpleador: "aaa",
        horaEntradaSupervisor: object["HORA ENTRADA"],
        horaSalidaEmpleador: "bbb",
        horaSalidaSupervisor: object["HORA SALIDA"],
        tiempoAlmuerzoEmpleador: "ccc",
        tiempoAlmuerzoSupervisor: object["TIEMPO DE ALMUERZO"],
        recesoManianaEmpleador: "ddd",
        recesoManianaSupervisor: object["TIEMPO RECESO EN MAÑANA"],
        recesoTardeEmpleador: "eee",
        recesoTardeSupervisor: object["TIEMPO RECESO EN TARDE"],
      };
      if (+dia >= 1 || +dia <= 15) {
        primerQuincena.push(data);
      } else {
        segundaQuincena.push(data);
      }
    }

    return {
      primerQuincena,
      segundaQuincena,
    };
  }
}

const instance = new GoogleSheetClass();
export default instance;
