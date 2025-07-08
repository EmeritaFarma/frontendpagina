import { Button } from "@/components/ui/button";
import { ScheduleFilter } from "@/lib/types/schedule";
import { formatTextSchedule } from "@/lib/utils";
import { Pencil } from "lucide-react";
import { Link } from "react-router-dom";

interface Props {
    schedule: ScheduleFilter
}

export default function ScheduleCard({ schedule }: Props) {

    const { name, schedule: schedules } = schedule

    return (
        <article className="border border-gray-200 rounded-lg p-4 bg-white shadow">
            <header className="pb-3 flex justify-between gap-4">
                <div>
                    <h4 className="text-sm text-gray-400">Sucursal</h4>
                    <p className="font-medium">{name}</p>
                </div>
                <div>
                    <Button asChild variant={'outline'} size={'icon'}> 
                        <Link to={`/admin/branchs/edit/${schedule.id}`}>
                            <Pencil width={14} height={14} />
                        </Link>
                    </Button>
                </div>
            </header>

            <div className="border-t border-gray-200 pt-3 grid gap-2">
                {
                    schedules.map((schedule) => (
                         <div className="flex gap-6">
                    <div className="">
                        <span className="text-sm text-gray-400">Horario de la semana</span>
                        <p className="font-medium capitalize">{formatTextSchedule(schedule)}</p>
                    </div>
                </div>
                    ))
                }
    
            </div>
        </article>
    )
}
