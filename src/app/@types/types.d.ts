declare module "google-drive-getfilelist";

export type AppContextType = {
  empleado: string;
  mes: string;
  updateEmpleado: (string) => void;
  updateMes: (string) => void;
};

export type RowFileType = {
  Timestamp: string;
  FECHA: string;
  "NOMBRE TRABAJADOR": string;
  "HORA ENTRADA": string;
  "HORA SALIDA": string;
  "TIEMPO DE ALMUERZO": string;
  "TIEMPO RECESO EN MAÑANA": string;
  "TIEMPO RECESO EN TARDE": string;
  OBSERVACIONES?: string;
};

export type RowTableType = {
  fecha: string;
  empleado: string;
  horaEntradaEmpleador: string;
  horaEntradaSupervisor: string;
  horaSalidaEmpleador: string;
  horaSalidaSupervisor: string;
  tiempoAlmuerzoEmpleador: string;
  tiempoAlmuerzoSupervisor: string;
  recesoManianaEmpleador: string;
  recesoManianaSupervisor: string;
  recesoTardeEmpleador: string;
  recesoTardeSupervisor: string;
};
