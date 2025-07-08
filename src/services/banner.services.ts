
import { Banner } from "@/lib/types/banner"
import { API } from "./api"

export const getBanners = async () => {
    const { data } = await API.get<{message: Banner[]}>("/banner")
    return data.message
}

export const getBannerById = async (id: string) => {
    const { data } = await API.get<{message: string}>(`/banner/${id}`)
    return data.message
}

export const createBanner = async (newDate: FormData) => {
    const { data: response } = await API.post<{message: string}>("/banner", newDate)
    return response.message
}

export const deleteBanner = async (id: number) => {
    const { data: response } = await API.delete<{message: string}>(`/banner/${id}`)
    return response.message
}

export const updateBanner = async ( data: Banner[]) => {
    const { data: response } = await API.put<{message: string}>(`/banner`, data)
    return response.message
}