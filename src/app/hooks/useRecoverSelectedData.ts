"use client";
import { useContext, useEffect } from "react";
import { AppContext } from "../context/appContext";
import { AppContextType } from "../@types/types";

export const useRecoverSelectedData = () => {
  const { empleado, mes } = useContext(AppContext) as AppContextType;

  return { empleado, mes };
};
