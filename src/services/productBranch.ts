
import { ProductByBranch } from "@/lib/types/product"
import { API } from "./api"
import { ProductBranch } from "@/lib/types/productBranch"
import { AxiosError } from "axios"

export const getProductBranch = async () => {
    const { data } = await API.get<{message: ProductByBranch[]}>("/productBranch")
    return data.message
}

export const getProductBranchById = async (id: number) => {
    const { data } = await API.get<{message: ProductBranch}>(`/product/branch/item/${id}`)
    return data.message
}

export const getProductBranchByIds = async (id: string) => {
    const { data } = await API.get<{message: ProductByBranch}>(`/productBranch/${id}`)
    return data.message
}

export const createProductBranch = async (newDate: Omit<ProductBranch, "id">) => {
    try {
        const { data: response } = await API.post<{message: string}>("/product/branch", newDate)
        return response.message
        
    } catch (error) {
        if (error instanceof AxiosError) {
            const message:string = error.response?.data?.message ? error.response.data.message : error.message
            throw new Error(message)
        }
    }
}

export const updateProductBranch = async (id: string, newDate: Omit<ProductBranch, "id">) => {
    const { data: response } = await API.put<{message: string}>(`/product/branch/${id}`, newDate)
    return response.message
}

export const deleteProductBranch = async (id: number) => {
    const { data: response } = await API.delete<{message: string}>(`/product/branch/${id}`)
    return response.message
}