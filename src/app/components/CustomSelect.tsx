"use client";
import { Select, SelectItem } from "@nextui-org/react";
import { ChangeEvent } from "react";

const CustomSelect = ({
  name,
  items,
  label,
  placeholder = "Seleccione un campo.",
  onChange,
}: {
  name: string;
  items: { value: string; label: string }[];
  label: string;
  placeholder?: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}) => {
  return (
    <Select
      name={name}
      items={items}
      label={label}
      placeholder={placeholder}
      className="w-full"
      onChange={onChange}
    >
      {(animal) => <SelectItem key={animal.value}>{animal.label}</SelectItem>}
    </Select>
  );
};

export default CustomSelect;
