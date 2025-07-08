import { Role } from "@/lib/types/rol"
import { API } from "./api"



export const getRol = async () => {
    const { data } = await API.get<{ message: Role[] }>('/rol')
    return data.message
}

export const getRole = async (id: number) => {
    const { data } = await API.get<{ message: Role }>(`/rol/${id}`)
    return data.message
}

export const createRole = async (newData: Omit<Role, 'id'>) => {
    const { data } = await API.post<{ message: string }>('/rol', newData)
    return data.message
}

export const updateRole = async (id: number, newData: Omit<Role, 'id'>) => {
    const { data } = await API.put<{ message: string }>(`/rol/${id}`, newData)
    return data.message
}

export const deleteRole = async (id: number) => {
    const { data } = await API.delete<{ message: string }>(`/rol/${id}`)
    return data.message
}