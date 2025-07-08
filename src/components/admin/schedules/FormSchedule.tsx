import ButtonForm from "@/components/components-general/ButtonForm"
import SelectForm from "@/components/components-general/SelectForm"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectValue, SelectTrigger } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useModal } from "@/hooks/use-modal"
import { daysOptions, timeOptions } from "@/lib/helper"
import { ScheduleForm } from "@/lib/types/schedule"
import { formatTextSchedule } from "@/lib/utils"
import { scheduleValidationSchema } from "@/validation/schedule"
import { zodResolver } from "@hookform/resolvers/zod"
import { Calendar, Plus, Trash } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"



export default function FormSchedule() {

    const { closeModal } = useModal()
    const [onlyDay, setOnlyDay] = useState(false);
    const [notWorking, setNotWorking] = useState(false);
    const [schedule, setSchedule] = useState<ScheduleForm>({
        dayFrom: '',
        dayTo: '',
        timeIn: '',
        timeOut: ''
    })
    const [addSchedule, setaddSchedule] = useState(false);


    const form = useForm<z.infer<typeof scheduleValidationSchema>>({
        resolver: zodResolver(scheduleValidationSchema),
        defaultValues: {
            name: '',
            schedules: []
        },
    })

    const { formState: { errors }, getValues, setValue, clearErrors, setError } = form;

    const onSubmit = (_data: z.infer<typeof scheduleValidationSchema>) => {
    
    }

    const handleSaveSchedule = () => {
        const schedules = getValues('schedules')
        const newSchedule = schedule
        
       
        if(!schedule.dayFrom) return showError()
        if(!schedule.dayTo && !onlyDay) return showError()
        if(!schedule.timeIn && !notWorking) return showError()
        if(!schedule.timeOut && !notWorking) return showError()

        if(onlyDay){
            newSchedule.dayTo = ''
        }

        if(notWorking){
            newSchedule.timeIn = ''
            newSchedule.timeOut = ''
        }
        
        setValue('schedules', [...schedules, newSchedule])
        resetValues()
        setaddSchedule(false)
        
    }
    const handleRemoveSchedule = (index: number) => {
        const schedules = getValues('schedules')
        setValue('schedules', schedules.filter((_, i) => i !== index))
    }

    const handleChangeSchedule = (name: string, value: string) => {
        setSchedule((prevState) => ({ ...prevState, [name]: value }))
    }

    const handleCloseSchedule = () => { 
        setaddSchedule(false)
        resetValues()
    }

    function showError() {
        setError('root', {
            type: 'required',
            message: 'Llena todo los campos para guardar el horario'
        })
    }

    function resetValues() {
        setSchedule({
            dayFrom: '',
            dayTo: '',
            timeIn: '',
            timeOut: ''
        })
        clearErrors('schedules')
        clearErrors('root')
        setNotWorking(false)
        setOnlyDay(false)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="space-y-4">
                    <SelectForm label="Sucursal" name="name" control={form.control} placeholder="Selecciona la sucursal">
                        <SelectItem value="1">Oficina Central</SelectItem>
                        <SelectItem value="2">Oficina Este</SelectItem>
                        <SelectItem value="3">Oficina Oeste</SelectItem>
                        <SelectItem value="4">Oficina Sur</SelectItem>
                    </SelectForm>
                    <div>
                        <div className="flex items-center gap-4 justify-between">
                            <div>
                                <h2 className="font-medium flex items-center gap-2 text-sm"> Horario</h2>
                                <p className="text-sm text-gray-400">Añade un horario para la sucursal</p>
                            </div>
                            {!addSchedule ? <Button type="button" onClick={() => setaddSchedule(true)} variant={'outline'} size={'icon'} className="" >
                                <Plus width={16} height={16} />
                            </Button> : (
                                <Button type="button" onClick={handleCloseSchedule } variant={'outline'} className="" >
                                    Cancelar
                                </Button>
                            )}
                        </div>
                        {addSchedule && (
                            <div className="space-y-1 mt-4">
                                <div className={`grid gap-4 ${!onlyDay ? 'grid-cols-2' : ''}`}>
                                    <div className="space-y-2">
                                        <Label htmlFor="dayFrom" className="">De:</Label>
                                        <Select name="dayFrom" onValueChange={(value) => handleChangeSchedule('dayFrom', value)}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Selecciona el horario" />
                                            </SelectTrigger>
                                            <SelectContent >
                                                <SelectGroup>
                                                <SelectLabel>Selecciona el horario</SelectLabel>
                                                  {
                                                    daysOptions.map((day, index) => (
                                                        <SelectItem key={index} value={day.value}>{day.label}</SelectItem>
                                                    ))
                                                  }
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                   {!onlyDay && <div className="space-y-2">
                                        <Label htmlFor="dayTo" className="">A:</Label>
                                        <Select name="dayTo" onValueChange={(value) => handleChangeSchedule('dayTo', value)}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Selecciona el horario" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Selecciona el horario</SelectLabel>
                                                    {
                                                        daysOptions.map((day, index) => (
                                                            <SelectItem key={index} value={day.value}>{day.label}</SelectItem>
                                                        ))
                                                    }
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    }

                                </div>
                                {!notWorking && <div className="grid grid-cols-2 gap-4 ">
                                    <div className="space-y-2">
                                        <Label htmlFor="timeFrom" className="">Hora inicial</Label>
                                        <Select name="timeFrom" onValueChange={(value) => handleChangeSchedule('timeFrom', value)}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Selecciona el horario" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Selecciona el horario</SelectLabel>
                                                    {
                                                        timeOptions.map((time, index) => (
                                                            <SelectItem key={index} value={time}>{time}</SelectItem>
                                                        ))
                                                    }
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="timeTo" className="">Hora Final</Label>
                                        <Select name="timeTo" onValueChange={(value) => handleChangeSchedule('timeTo', value)}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Selecciona el horario" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Selecciona el horario</SelectLabel>
                                                    {
                                                        timeOptions.map((time, index) => (
                                                            <SelectItem key={index} value={time}>{time}</SelectItem>
                                                        ))
                                                    }
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>}
                                {errors.root?.message && <p className="text-red-400 text-sm mt-1">{errors.root?.message}</p>}
                                   
                                    <div className="mt-2 space-y-3 ">
                                        <div className="flex items-center gap-2 justify-between">
                                            <Label className="" htmlFor="only-week">Solo un dia de la semana</Label>
                                            <Switch id="only-week" onCheckedChange={(value) => setOnlyDay(value)} checked={onlyDay} />
                                        </div>
                                        <div className="flex items-center gap-2 justify-between">
                                            <Label className="" htmlFor="not-working">Esta cerrado</Label>
                                            <Switch id="not-working" onCheckedChange={(value) => setNotWorking(value)} checked={notWorking} />
                                        </div>
                                    </div>
                                                
                                <Button onClick={handleSaveSchedule} type="button" variant={'outline'} className="mt-4 ml-auto flex">
                                    <Plus width={16} height={16} />
                                    Añadir Horario
                                </Button>
                            </div>
                        )}
                        {errors?.schedules && <p className="text-red-400 text-sm mt-1">{errors.schedules?.message}</p>}
                        <ul className="mt-2  text-primary text-sm ">
                            {
                                getValues('schedules')?.map((schedule, index) => (
                                    <li key={index} className="flex items-center justify-between gap-4">
                                        <div className="flex items-center gap-2">
                                            <Calendar width={14} /> <span className="capitalize">{formatTextSchedule(schedule)}</span>
                                        </div>
                                        <div className="flex items-center text-gray-400">
                                            <Button onClick={() => handleRemoveSchedule(index)} variant={'ghost'} size={'icon'}> <Trash width={12} height={12} /> </Button>
                                        </div>
                                    </li>
                                ))

                            }
                        </ul>
                    </div>
                </div>
                <div className="flex justify-end items-center mt-6 gap-4">
                    <Button type="button" variant="outline" onClick={closeModal}>Cancelar</Button>
                    <ButtonForm type="submit">Agregar</ButtonForm>
                </div>
            </form>
        </Form>
    )
}
