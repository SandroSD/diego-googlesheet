"use client";

import { FC, ReactNode, createContext, useState } from "react";
import { AppContextType } from "../@types/types";

export const AppContext = createContext<AppContextType | null>(null);

const AppProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [empleado, setEmpleado] = useState("");
  const [mes, setMes] = useState("");

  const updateEmpleado = (empleado: string) => setEmpleado(empleado);
  const updateMes = (mes: string) => setMes(mes);

  return (
    <AppContext.Provider value={{ empleado, mes, updateEmpleado, updateMes }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
