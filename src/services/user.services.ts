import { User } from "@/lib/types/user"
import { API } from "./api"

export const getUsers = async () => {
    const { data } = await API.get<{ message: User[] }>('/user')
    return data.message
}

export const getUser = async (id: number) => {
    const { data } = await API.get<{ message: User }>(`/user/${id}`)
    return data.message
}

export const createUser = async (newData: Omit<User, "role"|"id"> & { role: number }) => {
    const { data } = await API.post<{ message: string }>('/user', newData)
    return data.message
}

export const updateUser = async (id: number, newData: Omit<User, "role"|"id"> & { role: number }) => {
    const { data } = await API.put<{ message: string }>(`/user/${id}`, newData)
    return data.message
}

export const deleteUser = async (id: number) => {
    const { data } = await API.delete<{ message: string }>(`/user/${id}`)
    return data.message
}

export const login = async (email: string, password: string) => {
    const { data } = await API.post<{ message: string, token:string }>('/user/login', { email, password })
    return data
}

export const verifyToken = async () => {
    const token = localStorage.getItem('token') ?? ''
    const { data } = await API.get<{ message: string, status:'success'|'error' }>('/user/verifyToken', { 
        headers: {
            Authorization: `Bearer ${token}`
        }
     }) 
    return data
}

export const logout = async () => {
    const { data } = await API.post<{ message: string }>('/user/logout')
    return data
}