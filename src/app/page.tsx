import React from "react";

import Form from "./components/Home/Form";
import googleClassInstance from "@/app/utils/data";

// revisar como centrar los componentes al medio de la pantalla, CLASSES TAILWIND

export default async function Home() {
  const data = await googleClassInstance.loadInitialData();

  if (!data) return "Loading...";

  return (
    <div className="flex flex-col bg-blue-300 items-center justify-center gap-5 p-5 h-full">
      <Form empleados={data.empleados} meses={data.meses} />
    </div>
  );
}
