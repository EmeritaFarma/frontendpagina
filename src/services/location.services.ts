import { Location } from "@/lib/types/location"
import { API } from "./api"


export const getLocations = async () => {
    const response = await API.get<Location[]>("/locations")
    return response.data
}