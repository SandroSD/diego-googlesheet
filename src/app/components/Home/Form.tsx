"use client";

import { ChangeEvent, useRef, useState } from "react";
import CustomButton from "../CustomButton";
import CustomSelect from "../CustomSelect";

const Form = ({
  empleados,
  meses,
}: {
  empleados: { label: string; value: string }[];
  meses: { label: string; value: string }[];
}) => {
  const [formData, setFormData] = useState({ empleado: "", mes: "" });

  const handleOnClick = () => {
    console.log("FORM DATA: ", formData);
  };

  const selectOnChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="flex flex-col items-center justify-center gap-5 p-5">
      <div className="w-1/4">
        <CustomSelect
          name="empleado"
          label="Empleados"
          items={empleados}
          onChange={selectOnChange}
        />
      </div>
      <div className="w-1/4">
        <CustomSelect
          name="mes"
          label="Meses"
          items={meses}
          onChange={selectOnChange}
        />
      </div>
      <div className="w-1/6">
        <CustomButton
          onClick={handleOnClick}
          isDisabled={!formData.empleado || !formData.mes}
        />
      </div>
    </div>
  );
};

export default Form;
