import { ScheduleWithBranch } from "@/lib/types/schedule";
import { API } from "./api";

export const getSchedules = async () => {
    const response = await API.get<ScheduleWithBranch[]>('/schedule')
    return response.data
}