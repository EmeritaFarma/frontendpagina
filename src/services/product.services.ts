import { Product, ProductByBranch } from "@/lib/types/product"
import { API } from "./api"
import { AxiosError } from "axios"

export const getProducts = async (search?:string) => {
    const params = search ? `?search=${search}` : ''
    const { data } = await API.get<{message: Product[]}>(`/product${params}`)
    return data.message
}

export const getProductsByBranch = async (branchId: number) => {
    const { data } = await API.get<{message: ProductByBranch[]}>(`/product?branch=${branchId}`)
    return data.message
}

export const getProductById = async (id: string) => {
    const { data } = await API.get<{message: Product}>(`/product/${id}`)
    return data.message
}

export const createProduct = async (newDate: FormData) => {
    const { data: response } = await API.post<{message: string}>("/product", newDate,{
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    return response.message
}

export const updateProduct = async (id: string, newDate: FormData) => {
    const { data: response } = await API.put<{message: string}>(`/product/${id}`, newDate,{
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    return response.message
}

export const deleteProduct = async (id: string) => {
    try {
        const { data: response } = await API.delete<{message: string}>(`/product/${id}`)
        return response.message
        
    } catch (error) {
        if (error instanceof AxiosError) {
            const message:string = error.response?.data?.message ? error.response.data.message : error.message
            throw new Error(message)
        }
    }
}