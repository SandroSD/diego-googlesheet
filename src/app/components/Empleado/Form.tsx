"use client";

import { ChangeEvent, useEffect, useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableColumn,
  TableHeader,
  TableRow,
  TableCell,
  Pagination,
  useDisclosure,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Input,
  Button,
  Spinner,
} from "@nextui-org/react";
import { RowTableType } from "@/app/@types/types";
import PencilIcon from "@/app/icons/pencil";
import { handleSubmitForm } from "@/app/actions";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";

const Form = ({ quincena, mes }: { quincena: RowTableType[]; mes: string }) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [submitIsClicked, setSubmitIsClicked] = useState<boolean>(false);

  const [state, action] = useFormState(handleSubmitForm, {
    message: null,
    success: false,
  });

  const [page, setPage] = useState(1);
  const [rowSelected, setRowSelected] = useState<RowTableType | null>(null);

  const [formUpdate, setFormUpdate] = useState({
    horaEntrada: "",
    horaSalida: "",
    recesoManiana: "",
    recesoTarde: "",
    tiempoAlmuerzo: "",
  });

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
      th: "bg-[#0B274D] text-gray-100 text-sm",
    }),
    []
  );

  const classNamesPagination = useMemo(
    () => ({
      cursor: "bg-[#D70101] font-bold text-base",
    }),
    []
  );

  const classNamesInput = useMemo(
    () => ({
      input: "text-center text-lg",
    }),
    []
  );

  const handleSubmitTrigger = () => {
    setSubmitIsClicked((prevState) => !prevState);
  };

  const handleEditButton = (row: RowTableType) => {
    onOpen();
    setRowSelected(row);
    setFormUpdate((prevData) => ({
      ...prevData,
      horaEntrada: row.horaEntradaSupervisor,
      horaSalida: row.horaSalidaSupervisor,
      recesoManiana: row.recesoManianaSupervisor,
      recesoTarde: row.recesoTardeSupervisor,
      tiempoAlmuerzo: row.tiempoAlmuerzoSupervisor,
    }));
  };

  const handleUpdateValue = (event: ChangeEvent<HTMLInputElement>) => {
    setFormUpdate((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };
  useEffect(() => {
    if (submitIsClicked) {
      setTimeout(() => {
        setSubmitIsClicked((prevState) => !prevState);
        onClose();
        state.message = "";
        state.success = false;
        router.refresh();
      }, 1500);
    }
  }, [state, submitIsClicked, onClose, router]);

  return (
    <>
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
          <TableColumn>{""}</TableColumn>
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
              <TableCell>
                <Button
                  isIconOnly
                  color="danger"
                  aria-label="Like"
                  size="sm"
                  className="bg-white rounded-full"
                  onClick={() => handleEditButton(row)}
                >
                  <PencilIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Modal
        backdrop="blur"
        isOpen={isOpen}
        onClose={onClose}
        isDismissable={false}
        isKeyboardDismissDisabled
        size="xl"
      >
        <ModalContent>
          {(onClose) => (
            <form
              action={action}
              onSubmit={handleSubmitTrigger}
              className="space-y-5"
            >
              <ModalHeader className="flex flex-col gap-1">
                {rowSelected?.empleado || ""}
              </ModalHeader>
              <ModalBody className="flex flex-col">
                <input type="hidden" name="mes" value={mes} />
                <input type="hidden" name="fecha" value={rowSelected?.fecha} />
                <div className="text-lg">{rowSelected?.fecha} </div>
                <div className="flex">
                  <div className="w-1/2"></div>
                  <div className="w-1/2 font-bold text-center">Empleado</div>
                  <div className="w-1/2 font-bold text-center">Supervisor</div>
                </div>
                <div className="flex">
                  <div className="w-1/2 font-bold">Hora de Entrada</div>
                  <div className="w-1/2 text-center">
                    {rowSelected?.horaEntradaEmpleador}
                  </div>
                  <div className="w-1/2">
                    <Input
                      id="horaEntrada"
                      name="horaEntrada"
                      classNames={classNamesInput}
                      value={formUpdate.horaEntrada}
                      onChange={handleUpdateValue}
                    />
                  </div>
                </div>
                <div className="flex">
                  <div className="w-1/2 font-bold">Hora de Salida</div>
                  <div className="w-1/2 text-center">
                    {rowSelected?.horaSalidaEmpleador}
                  </div>
                  <div className="w-1/2">
                    <Input
                      id="horaSalida"
                      name="horaSalida"
                      classNames={classNamesInput}
                      value={formUpdate.horaSalida}
                      onChange={handleUpdateValue}
                    />
                  </div>
                </div>
                <div className="flex">
                  <div className="w-1/2 font-bold">Receso por la Mañana</div>
                  <div className="w-1/2 text-center">
                    {rowSelected?.recesoManianaEmpleador}
                  </div>
                  <div className="w-1/2">
                    <Input
                      id="recesoManiana"
                      name="recesoManiana"
                      classNames={classNamesInput}
                      value={formUpdate.recesoManiana}
                      onChange={handleUpdateValue}
                    />
                  </div>
                </div>
                <div className="flex">
                  <div className="w-1/2 font-bold">Receso por la Tarde</div>
                  <div className="w-1/2 text-center">
                    {rowSelected?.recesoTardeEmpleador}
                  </div>
                  <div className="w-1/2">
                    <Input
                      id="recesoTarde"
                      name="recesoTarde"
                      classNames={classNamesInput}
                      value={formUpdate.recesoTarde}
                      onChange={handleUpdateValue}
                    />
                  </div>
                </div>
                <div className="flex">
                  <div className="w-1/2 font-bold">Tiempo de Almuerzo</div>
                  <div className="w-1/2 text-center">
                    {rowSelected?.tiempoAlmuerzoEmpleador}
                  </div>
                  <div className="w-1/2">
                    <Input
                      id="tiempoAlmuerzo"
                      name="tiempoAlmuerzo"
                      classNames={classNamesInput}
                      value={formUpdate.tiempoAlmuerzo}
                      onChange={handleUpdateValue}
                    />
                  </div>
                </div>
                {state.message && (
                  <p
                    className={`${
                      state.success ? "text-green-700" : "text-red-700"
                    } font-bold`}
                  >
                    {state.message}
                  </p>
                )}
              </ModalBody>
              <ModalFooter>
                <Button
                  className="bg-[#D70101] disabled:bg-[#D70101]/50  text-white font-bold"
                  onPress={onClose}
                  disabled={submitIsClicked}
                >
                  Cerrar
                </Button>
                <Button
                  className="bg-[#0B274D] disabled:bg-[#0B274D]/50 text-white font-bold"
                  type="submit"
                  disabled={
                    !formUpdate.horaEntrada ||
                    !formUpdate.horaSalida ||
                    !formUpdate.recesoManiana ||
                    !formUpdate.recesoTarde ||
                    !formUpdate.tiempoAlmuerzo ||
                    submitIsClicked
                  }
                >
                  {submitIsClicked && (
                    <Spinner color="default" size="sm" className="mr-1" />
                  )}{" "}
                  Guardar
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Form;
