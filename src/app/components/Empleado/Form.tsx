"use client";

import { RowTableType } from "@/app/@types/types";
import {
  Table,
  TableBody,
  TableColumn,
  TableHeader,
  TableRow,
  TableCell,
  Pagination,
} from "@nextui-org/react";
import { useMemo, useState } from "react";

const Form = ({ quincena }: { quincena: RowTableType[] }) => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  const pages = Math.ceil(quincena.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return quincena.slice(start, end);
  }, [page, quincena]);

  const classNamesTable = useMemo(
    () => ({
      wrapper: "border-2 border-gray-500 bg-gray-200",
      table: "",
      th: "bg-[#0B274D] text-gray-100 text-sm",
    }),
    []
  );

  const classNamesPagination = useMemo(
    () => ({
      //wrapper: "border-2 border-gray-500 bg-gray-200",
      cursor: "bg-[#D70101] font-bold text-base",
    }),
    []
  );

  return (
    <Table
      isCompact
      selectionMode="single"
      classNames={classNamesTable}
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            classNames={classNamesPagination}
            color="secondary"
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
          />
        </div>
      }
    >
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
        {items.map((row, index) => (
          <TableRow
            key={index}
            className={
              row.horaEntradaEmpleador !== row.horaEntradaSupervisor ||
              row.horaSalidaEmpleador !== row.horaSalidaSupervisor ||
              row.tiempoAlmuerzoEmpleador !== row.tiempoAlmuerzoSupervisor ||
              row.recesoManianaEmpleador !== row.recesoManianaSupervisor ||
              row.recesoTardeEmpleador !== row.recesoTardeSupervisor
                ? "text-red-500"
                : ""
            }
          >
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
