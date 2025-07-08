import RemoveBranch from "@/components/admin/branch/RemoveBranch";
import Loading from "@/components/admin/Loading";
import { Button } from "@/components/ui/button";
import { branchsColumns } from "@/payments/columns";
import { DataTable } from "@/payments/data-table";
import { getBranchs } from "@/services/branch.services";
import { useQuery } from "@tanstack/react-query";
import { CirclePlus } from "lucide-react";
import { Link } from "react-router-dom";

export default function Branch() {

  const { data , isLoading} = useQuery({ queryKey: ['branchs'], queryFn: getBranchs})

  return (
    <div className="max-w-6xl">
      <header className=" mb-4">
        <h1 className="font-medium text-xl">Sucursales</h1>
        <p className="text-gray-400 text-sm">
          Aquí podrás gestionar todas las sucursales de tu negocio. Puedes crear, editar y eliminar sucursales.
        </p>
      </header>
      <div className="mb-4 flex justify-end">
        <Button variant={'dashboard'} asChild>
          <Link to={'/admin/branchs/add'}>
            <CirclePlus className=" h-4 w-4" />
            Agregar
          </Link>
        </Button>
      </div>
      <div>
         {isLoading && <Loading />}
       {!isLoading && data && <DataTable columns={branchsColumns} data={data} />}
      </div>
      <RemoveBranch />
    </div>
  )
}
