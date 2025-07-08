import Loading from "@/components/admin/Loading";
import Modal, { ModalButton, ModalContent } from "@/components/admin/Modal";
import EditUser from "@/components/admin/user/EditUser";
import FormUser from "@/components/admin/user/FormUser";
import RemoveUser from "@/components/admin/user/RemoveUser";
import { useIdParams } from "@/hooks/use-idparams";
import { usersColumns } from "@/payments/columns";
import { DataTable } from "@/payments/data-table";
import { getUsers } from "@/services/user.services";
import { useQuery } from "@tanstack/react-query";
import { CirclePlus } from "lucide-react";


export default function Users() {
  
  const { id } = useIdParams("editid")
  const { data, isLoading } = useQuery({ queryKey: ['users'], queryFn: getUsers})

    return (
    <div className="max-w-5xl">
      <header className="mb-4">
          <h1 className="font-medium text-xl">Usuarios</h1>
          <p className="text-gray-400 text-sm">
            Aquí podrás gestionar todos los usuarios de tu negocio. Puedes crear, editar y eliminar usuarios.
          </p>
      </header>
      <div className="flex justify-end">
        <Modal>
          <ModalButton variant="dashboard"> <CirclePlus /> Agregar</ModalButton>
          <ModalContent title="Agregar Usuario" description="Crea un nuevo usuario">
            <div>
              <FormUser />
            </div>
          </ModalContent>
        </Modal>
      </div>
      <div className="mt-4">
        {isLoading && <Loading />}
        {!isLoading && data && <DataTable columns={usersColumns} data={data} />}
      </div>
      <RemoveUser />
      {id &&<EditUser />}
    </div>
  )
}
