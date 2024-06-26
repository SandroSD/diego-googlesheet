import { JWT } from "google-auth-library";
import credentials from "../../../credentials.json";
import { GoogleSpreadsheet, GoogleSpreadsheetRow } from "google-spreadsheet";
import { config } from "../config";

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
        return {
          primerQuincena: [],
          segundaQuincena: [],
        };
      }

      const fileSupervisor = response.data.files?.filter((file) =>
        file.name?.includes(`SUPERVISOR_${mes}`)
      )[0];

      const fileEmpleado = response.data.files?.filter((file) =>
        file.name?.includes(`EMPLEADO_${mes}`)
      )[0];

      if (fileSupervisor === undefined || fileEmpleado === undefined)
        return {
          primerQuincena: [],
          segundaQuincena: [],
        };

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

  async updateSupervisorRow(
    data: {
      mes: string;
      fecha: string;
      horaEntrada: string;
      horaSalida: string;
      recesoManiana: string;
      recesoTarde: string;
      tiempoAlmuerzo: string;
    },
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

      const fileSupervisor = response.data.files?.filter((file) =>
        file.name?.includes(`SUPERVISOR_${mes}`)
      )[0];

      if (fileSupervisor === undefined) return null;

      const documentSupervisor = await this.getInfoFromFileById(
        fileSupervisor.id as string
      );

      const supervisorSheet = documentSupervisor.sheetsByIndex[0];
      const supervisorInfo = await supervisorSheet.getRows<RowFileType>();

      const indexRowToUpdate = supervisorInfo.findIndex(
        (row) => row.get("FECHA") === data.fecha
      );

      console.log("INDEX, ROW TO UPDATE: ", indexRowToUpdate);

      const rowToUpdate = supervisorInfo[indexRowToUpdate];

      rowToUpdate.set("HORA ENTRADA", data.horaEntrada);
      rowToUpdate.set("HORA SALIDA", data.horaSalida);
      rowToUpdate.set("TIEMPO RECESO EN MAÑANA", data.recesoManiana);
      rowToUpdate.set("TIEMPO RECESO EN TARDE", data.recesoTarde);
      rowToUpdate.set("TIEMPO DE ALMUERZO", data.tiempoAlmuerzo);

      await rowToUpdate.save();

      console.log("SE GRABO ???");
      return true;
    } catch (error) {
      console.log("ERROR TRYING TO UPDATE: ", error);
      return false;
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

    const empleadoRows = this.fromGoogleSpreadSheetToRow(empleadoInfo);

    for (const row of supervisorInfo) {
      const object = row.toObject() as RowFileType;

      const dateEmpleadoRow = empleadoRows.find(
        (empleadoRow) => empleadoRow.FECHA === object.FECHA
      );

      const dia = object.Timestamp.split(" ")[0].split("-")[2];

      if (object["NOMBRE TRABAJADOR"].toString() !== empleadoSelected) continue;

      const data = {
        fecha: object.FECHA,
        empleado: object["NOMBRE TRABAJADOR"],
        horaEntradaEmpleador: dateEmpleadoRow?.["HORA ENTRADA"] || "-",
        horaEntradaSupervisor: object["HORA ENTRADA"],
        horaSalidaEmpleador: dateEmpleadoRow?.["HORA SALIDA"] || "-",
        horaSalidaSupervisor: object["HORA SALIDA"],
        tiempoAlmuerzoEmpleador: dateEmpleadoRow?.["TIEMPO DE ALMUERZO"] || "-",
        tiempoAlmuerzoSupervisor: object["TIEMPO DE ALMUERZO"],
        recesoManianaEmpleador:
          dateEmpleadoRow?.["TIEMPO RECESO EN MAÑANA"] || "-",
        recesoManianaSupervisor: object["TIEMPO RECESO EN MAÑANA"],
        recesoTardeEmpleador:
          dateEmpleadoRow?.["TIEMPO RECESO EN TARDE"] || "-",
        recesoTardeSupervisor: object["TIEMPO RECESO EN TARDE"],
      };

      if (+dia >= 1 && +dia <= 15) {
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

  private fromGoogleSpreadSheetToRow(
    googleSpreadsheetRow: GoogleSpreadsheetRow[]
  ) {
    return googleSpreadsheetRow.map((row) => ({
      ...(row.toObject() as RowFileType),
    }));
  }
}

const instance = new GoogleSheetClass();
export default instance;
