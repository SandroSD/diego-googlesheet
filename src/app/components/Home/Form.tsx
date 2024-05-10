"use client";

import { ChangeEvent, useContext, useState, Fragment } from "react";
import CustomButton from "../CustomButton";
import CustomSelect from "../CustomSelect";
import { useRouter } from "next/navigation";
import { AppContext } from "@/app/context/appContext";
import { AppContextType } from "@/app/@types/types";

const Form = ({
  empleados,
  meses,
}: {
  empleados: { label: string; value: string }[];
  meses: { label: string; value: string }[];
}) => {
  const router = useRouter();
  const { updateEmpleado, updateMes } = useContext(
    AppContext
  ) as AppContextType;

  const [formData, setFormData] = useState({ empleado: "", mes: "" });

  const handleOnClick = () => {
    updateEmpleado(formData.empleado);
    updateMes(formData.mes);

    return router.push(`/${formData.empleado}/${formData.mes}`);
  };

  const selectOnChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="w-1/2 space-y-5">
      <CustomSelect
        name="empleado"
        label="Empleados"
        items={empleados}
        onChange={selectOnChange}
      />
      <CustomSelect
        name="mes"
        label="Meses"
        items={meses}
        onChange={selectOnChange}
      />
      <CustomButton
        onClick={handleOnClick}
        isDisabled={!formData.empleado || !formData.mes}
        label="Continuar"
        customStyle="bg-[#D70101] font-bold text-lg"
      />
    </div>
  );
};

export default Form;
