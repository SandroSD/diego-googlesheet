import Form from "@/app/components/Empleado/Form";
import googleClassInstance from "@/app/utils/data";
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
    <div className="flex-1 flex flex-col justify-center gap-10 p-5">
      <div>
        <h1 className="mb-5 text-6xl text-center">Primer Quincena</h1>
        <Form quincena={response.primerQuincena} mes={params.mes} />
      </div>
      <div>
        <h1 className="mb-5 text-6xl text-center">Segunda Quincena</h1>
        <Form quincena={response.segundaQuincena} mes={params.mes} />
      </div>
    </div>
  );
}
