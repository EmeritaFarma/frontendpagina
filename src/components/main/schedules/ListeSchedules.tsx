import ScheduleCard from "@/components/admin/schedules/ScheduleCard";
import { filterSchedule } from "@/lib/utils";
import { getSchedules } from "@/services/schedules.services";
import { useQuery } from "@tanstack/react-query";


export default function ListeSchedules() {

    const { data } = useQuery({ queryKey: ['schedules'], queryFn: getSchedules })

   const filteredData = filterSchedule(data ?? [])

   console.log(filteredData)
   

    return (
        <div className="grid grid-cols-2 gap-4">
            {
                filteredData?.map((schedule, index) => (
                    <ScheduleCard key={index} schedule={schedule} />
                ))
            }

        </div>
    )
}
