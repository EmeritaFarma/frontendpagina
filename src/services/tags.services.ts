import { Tag } from "@/lib/types/tag"
import { API } from "./api"


export const getTags = async () => {
    const { data } = await API.get<{ message: Tag[] }>('/tag')
    return data.message
}

export const getTag = async (id: number) => {
    const { data } = await API.get<{ message: Tag }>(`/tag/${id}`)
    return data.message
}

export const createTag = async (newData: Omit<Tag, 'id'>) => {
    const { data } = await API.post<{ message: string }>('/tag', newData)
    return data.message
}

export const updateTag = async (id: number, newData: Omit<Tag, 'id'>) => {
    const { data } = await API.put<{ message: string }>(`/tag/${id}`, newData)
    return data.message
}

export const deleteTag = async (id: number) => {
    const { data } = await API.delete<{ message: string }>(`/tag/${id}`)
    return data.message
}