"use server";

import googleClassInstance from "@/app/utils/data";
export async function handleSubmitForm(
  _prevState: any,
  formData: FormData
): Promise<{ message: string | null; success: boolean }> {
  const mes = formData.get("mes")?.toString();
  const fecha = formData.get("fecha")?.toString();
  const horaEntrada = formData.get("horaEntrada")?.toString();
  const horaSalida = formData.get("horaSalida")?.toString();
  const recesoManiana = formData.get("recesoManiana")?.toString();
  const recesoTarde = formData.get("recesoTarde")?.toString();
  const tiempoAlmuerzo = formData.get("tiempoAlmuerzo")?.toString();

  console.log({
    mes,
    fecha,
    horaEntrada,
    horaSalida,
    recesoManiana,
    recesoTarde,
    tiempoAlmuerzo,
  });

  if (
    !mes ||
    !fecha ||
    !horaEntrada ||
    !horaSalida ||
    !recesoManiana ||
    !recesoTarde ||
    !tiempoAlmuerzo
  )
    return {
      message:
        "Hubo un error con la información, por favor vuelva a intentarlo.",
      success: false,
    };

  await googleClassInstance.updateSupervisorRow(
    {
      mes,
      fecha,
      horaEntrada,
      horaSalida,
      recesoManiana,
      recesoTarde,
      tiempoAlmuerzo,
    },
    mes
  );

  return {
    message: "Se han registrado los cambios correctamente.",
    success: true,
  };
}
