import Form from "@/app/components/Empleado/Form";
import { useRecoverSelectedData } from "../../hooks/useRecoverSelectedData";
import { getFileData } from "../../utils/data";
import googleClassInstance from "@/app/utils/data2";

import CustomBackButton from "@/app/components/CustomBackButton";

export default async function Page({
  params,
}: {
  params: { empleado: string; mes: string };
}) {
  const response = await googleClassInstance.getFilesFromFolder(
    params.empleado.replaceAll("%20", " "),
    params.mes
  );

  if (!response) return;

  return (
    <div className="flex flex-col p-5">
      <div>
        <h1 className="mb-2 text-4xl">Primer Quincena</h1>
        <Form quincena={response.primerQuincena} />
      </div>
      <div>
        <h1 className="mb-2 text-4xl">Segunda Quincena</h1>
        <Form quincena={response.segundaQuincena} />
      </div>
      <div></div>
      <CustomBackButton isDisabled={false} label="Volver" />
    </div>
  );
}
