import { Branch } from "./branch";


export interface Schedule {
    id: number;
    timeIn: string;
    timeOut: string;
    dayTo: string;
    dayFrom: string;
}

type ScheduleForm = Omit<Schedule, 'id'>;
type ScheduleWithBranch = Schedule & { branch: Branch };

export interface ScheduleFilter { 
    id: number, 
    name: string,
    schedule: {dayFrom: string, dayTo: string, timeIn: string, timeOut: string }[]
}