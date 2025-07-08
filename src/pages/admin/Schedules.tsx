import ListeSchedules from "@/components/main/schedules/ListeSchedules";

export default function Schedules() {

  return (
    <div className="max-w-5xl">
      <header className=" mb-4">
          <h1 className="font-medium text-xl">Horarios</h1>
          <p className="text-gray-400 text-sm">
            Aquí podrás gestionar todas las horarios de tu negocio. Puedes crear, editar y eliminar horarios.
          </p>
      </header>
      <div className="mt-8">
        <ListeSchedules />
      </div>
    </div>
  )
}
