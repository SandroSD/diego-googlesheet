"use client";

import { RowTableType } from "@/app/@types/types";
import {
  Table,
  TableBody,
  TableColumn,
  TableHeader,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";

const Form = ({ quincena }: { quincena: RowTableType[] }) => {
  return (
    <Table isStriped isCompact>
      <TableHeader className="flex flex-col">
        <TableColumn key="fecha">Fecha</TableColumn>
        <TableColumn key="empleado">Empleado</TableColumn>
        <TableColumn key="horaEntrada">
          <div className="flex justify-center">Hora Entrada</div>
          <div className="flex justify-around">
            <div>Empleado</div>
            <div>Supervisor</div>
          </div>
        </TableColumn>
        <TableColumn key="horaSalida">
          <div className="flex justify-center">Hora Salida</div>
          <div className="flex justify-around">
            <div>Empleado</div>
            <div>Supervisor</div>
          </div>
        </TableColumn>
        <TableColumn key="tiempoAlmuerzoEmpleador">
          <div className="flex justify-center">
            Tiempo de Almuerzo (minutos)
          </div>
          <div className="flex justify-around">
            <div>Empleado</div>
            <div>Supervisor</div>
          </div>
        </TableColumn>
        <TableColumn key="recesoManianaEmpleador">
          <div className="flex justify-center">
            Receso en la Mañana (minutos)
          </div>
          <div className="flex justify-around">
            <div>Empleado</div>
            <div>Supervisor</div>
          </div>
        </TableColumn>
        <TableColumn key="recesoTardeEmpleador">
          <div className="flex justify-center">
            Receso en la Tarde (minutos)
          </div>
          <div className="flex justify-around">
            <div>Empleado</div>
            <div>Supervisor</div>
          </div>
        </TableColumn>
      </TableHeader>
      <TableBody emptyContent={"No hay información disponible."}>
        {quincena.map((row, index) => (
          <TableRow key={index}>
            <TableCell>{row.fecha}</TableCell>
            <TableCell>{row.empleado}</TableCell>
            <TableCell className="">
              <div className="flex justify-around">
                <div>{row.horaEntradaEmpleador}</div>
                <div>{row.horaEntradaSupervisor}</div>
              </div>
            </TableCell>
            <TableCell className="">
              <div className="flex justify-around">
                <div>{row.horaSalidaEmpleador}</div>
                <div>{row.horaSalidaSupervisor}</div>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex justify-around">
                <div>{row.tiempoAlmuerzoEmpleador}</div>
                <div>{row.tiempoAlmuerzoSupervisor}</div>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex justify-around">
                <div>{row.recesoManianaEmpleador}</div>
                <div>{row.recesoManianaSupervisor}</div>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex justify-around">
                <div>{row.recesoTardeEmpleador}</div>
                <div>{row.recesoTardeSupervisor}</div>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default Form;
