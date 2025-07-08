import { Branch } from "@/lib/types/branch"
import { API } from "./api"
import { branchValidationSchema } from "@/validation/branch"
import { z } from "zod"

export const getBranchs = async () => {
    const { data } = await API.get<{message: Branch[]}>("/branch")
    return data.message
}

export const getBranchById = async (id: string) => {
    const { data } = await API.get<{message: Branch}>(`/branch/${id}`)
    return data.message
}

export const createBranch = async (newDate: z.infer<typeof branchValidationSchema>) => {
    const { data: response } = await API.post<{message: string}>("/branch", newDate)
    return response.message
}

export const deleteBranch = async (id: number) => {
    const { data: response } = await API.delete<{message: string}>(`/branch/${id}`)
    return response.message
}

export const updateBranch = async (id: string, newDate: z.infer<typeof branchValidationSchema>) => {
    const { data: response } = await API.put<{message: string}>(`/branch/${id}`, newDate)
    return response.message
}