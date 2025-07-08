import { Category } from "@/lib/types/category"
import { API } from "./api"


export const getCategories = async () => {
    const { data } = await API.get<{ message: Category[] }>('/category')
    return data.message
}

export const getCategory = async (id: number) => {
    const { data } = await API.get<{ message: Category }>(`/category/${id}`)

    return data.message
}

export const createCategory = async (newData: Omit<Category, 'id'>) => {
    const { data } = await API.post<{ message: string }>('/category', newData)
    return data.message
}

export const updateCategory = async (id: number, newData: Omit<Category, 'id'>) => {
    const { data } = await API.put<{ message: string }>(`/category/${id}`, newData)
    return data.message
}

export const deleteCategory = async (id: number) => {
    const { data } = await API.delete<{ message: string }>(`/category/${id}`)
    return data.message
}