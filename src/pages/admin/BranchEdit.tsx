import { getBranchById, updateBranch } from "@/services/branch.services"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import InputForm from "@/components/components-general/InputForm";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectValue, SelectTrigger } from "@/components/ui/select"
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { daysOptions, timeOptions } from "@/lib/helper";
import { ScheduleForm } from "@/lib/types/schedule";
import { branchValidationSchema } from "@/validation/branch";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Calendar, Clock, Locate, MapPin, Pencil, Phone, Plus, Trash } from "lucide-react";
import {  useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ContactForm } from "@/lib/types/contact";
import { formatTextSchedule, generateLocation } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import MapsBranch from "@/components/admin/branch/MapBranch";

export default function BranchEdit() {

    const { id } = useParams<{id: string}>()

    const { data } = useQuery({ queryKey: ['branchs', id], queryFn: () => getBranchById(id as string)})

    const [contact, setContact] = useState<ContactForm>({
        type: '',
        number: '',
    });
    const redirect = useNavigate()
    const [addContact, setaddContact] = useState(false);
    const [onlyDay, setOnlyDay] = useState(false);
    const [notWorking, setNotWorking] = useState(false);
    const [schedule, setSchedule] = useState<ScheduleForm>({
        dayFrom: '',
        dayTo: '',
        timeIn: '',
        timeOut: ''
    })
    const [addSchedule, setaddSchedule] = useState(false);

    const mutation = useMutation({
        mutationFn: async (data: z.infer<typeof branchValidationSchema>) => updateBranch(id as string, data)
    })

    const form = useForm<z.infer<typeof branchValidationSchema>>({
        resolver: zodResolver(branchValidationSchema),
        defaultValues: {
            name: '',
            location: {
                street: '',
                number: '',
                betweenStreet: '',
                andBetweenStreet: '',
                zipCode: '',
                city: '',
                state: '',
                colony: '',
                latitude: 0,
                longitude: 0,
            },
            schedule: [],
            contact: []
        },
    });

    const { formState: { errors }, getValues, setValue, clearErrors, setError, watch } = form;

    watch('schedule')
    watch('contact')
    watch('location')

    useEffect(() => {
      
        if(data){
            setValue('name', data.name)
            setValue('location.street', data?.location?.street as string)
            setValue('location.number', data.location?.number as string)
            setValue('location.betweenStreet', data.location?.betweenStreet as string)
            setValue('location.andBetweenStreet', data.location?.andBetweenStreet as string)
            setValue('location.zipCode', data.location?.zipCode as string)
            setValue('location.city', data.location?.city  as string)
            setValue('location.state', data.location?.state as string)
            setValue('location.colony', data.location?.colony as string)
            setValue('location.latitude', data.location?.latitude as number)
            setValue('location.longitude', data.location?.longitude as number)
            setValue('schedule', data?.schedule as unknown as ScheduleForm[])
            setValue('contact', data?.contact as unknown as ContactForm[])
        }

    }, [data])
    

    const handleSaveSchedule = () => {
        const schedules = getValues('schedule')
        const newSchedule = schedule


        if (!schedule.dayFrom) return showError()
        if (!schedule.dayTo && !onlyDay) return showError()
        if (!schedule.timeIn && !notWorking) return showError()
        if (!schedule.timeOut && !notWorking) return showError()

        if (onlyDay) {
            newSchedule.dayTo = ''
        }

        if (notWorking) {
            newSchedule.timeIn = ''
            newSchedule.timeOut = ''
        }

        setValue('schedule', [...schedules, newSchedule])
        resetValues()
        setaddSchedule(false)

    }

    const handleSaveContact = () => {
        const contacts = getValues('contact')
        const newContact = contact
        
        if (Object.values(newContact).includes('')) {
            toast.error('Ingrese todos los campos del telefono')
            return
        }

        setValue('contact', [...contacts,newContact])
        setaddContact(false)
        setContact({
            type: '',
            number: ''
        })
        
    }
    const handleRemoveSchedule = (index: number) => {
        const schedules = getValues('schedule')
                setValue('schedule', schedules.filter((_, i) => i !== index))
    }
    const handleRemoveContact = (index: number) => {
        const contacts = getValues('contact')
        setValue('contact', contacts.filter((_, i) => i !== index))
    }

    const handleChangeSchedule = (name: string, value: string) => {
        setSchedule((prevState) => ({ ...prevState, [name]: value }))
    }
    const handleChangeContact = (name: string, value: string) => {
        setContact((prevState) => ({ ...prevState, [name]: value }))
    }

    const handleCloseSchedule = () => {
        setaddSchedule(false)
        resetValues()
    }

    const handleCloseContact = () => {
        setaddContact(false)
        resetValues()
        setContact({
            type: '',
            number: ''
        })
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
        clearErrors('schedule')
        clearErrors('root')
        setNotWorking(false)
        setOnlyDay(false)
    }

    const onSubmit = (data: z.infer<typeof branchValidationSchema>) => {
        if(data.schedule.length === 0){
            toast.error('Añade al menos un horario')
            return
        }
        if(data.contact.length === 0){
            toast.error('Añade al menos un contacto')
            return
        }

        console.log(data);
        
        
        mutation.mutate(data,{
            onSuccess: (message) => {
                toast.success(message)
                redirect('/admin/branchs',{replace: true})
            },
            onError: (_error) => {
                toast.error('Error al guardar')
            }
        })
    }

    const location = getValues('location.latitude') !== 0 ? generateLocation([getValues('location.latitude'), getValues('location.longitude')]) : null   


    

    return (
        <div>
            <Button variant={'notion'} className="mb-6" asChild>
                <Link to={'/admin/branchs'}>
                    <ArrowLeft width={16} height={16} />
                </Link>
            </Button>
            <div className="p-8 border border-gray-400/30 max-w-4xl mx-auto rounded-lg shadow">
                <div>
                    <h1 className="font-semibold text-xl ">Añadir nueva sucursal</h1>
                    <p className="text-gray-400 text-sm">Llene los campos con los datos de la sucursal</p>
                </div>
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="mt-6 grid gap-y-6">
                            <div>
                                <div className="mb-4">
                                    <h2 className="font-medium flex items-center gap-2"> <Locate width={16} height={16} /> Direccion</h2>
                                    <p className="text-gray-400 text-sm">Añada informacion de la sucursal</p>
                                </div>
                                <div className="space-y-4">
                                    <div className="max-w-sm">
                                        <InputForm label="Nombre de la Sucursal" placeholder="La villa" control={form.control} name="name" type="text" />
                                    </div>
                                    <div className="grid grid-cols-4 gap-4">
                                        <InputForm label="Calle" placeholder="77A" control={form.control} name="location.street" type="text" />
                                        <InputForm label="Numero" placeholder="108" control={form.control} name="location.number" type="text" />
                                        <InputForm label="Entre calle" placeholder="55" control={form.control} name="location.betweenStreet" type="text" />
                                        <InputForm label="Y calle" placeholder="55A" control={form.control} name="location.andBetweenStreet" type="text" />

                                    </div>
                                    <div className="grid grid-cols-4 gap-4">
                                        <InputForm label="Ciudad" placeholder="Madrid" control={form.control} name="location.city" type="text" />
                                        <InputForm label="Estado" placeholder="Madrid" control={form.control} name="location.state" type="text" />
                                        <InputForm label="Colonia" placeholder="Madrid" control={form.control} name="location.colony" type="text" />
                                        <InputForm label="Codigo Postal" placeholder="28001" control={form.control} name="location.zipCode" type="text" />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h2 className="font-medium flex items-center gap-2"> <MapPin width={16} height={16} /> Mapa</h2>
                                <p className="text-gray-400 text-sm">Selecciona la ubicación donde se ubica la sucursal</p>
                                <div className="mt-4">
                                    {location !== null &&<MapsBranch positionValue={location} setPositionValue={(value) => {
                                        if(value){
                                            setValue('location.latitude', value.lat)
                                            setValue('location.longitude', value.lng)
                                        }
                                    }} />}
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center gap-4 justify-between">
                                    <div>
                                        <h2 className="font-medium flex items-center gap-2"> <Clock width={16} height={16} /> Horario</h2>
                                        <p className="text-sm text-gray-400">Añade un horario para la sucursal</p>
                                    </div>
                                    {!addSchedule ? <Button type="button" onClick={() => setaddSchedule(true)} variant={'outline'} size={'icon'} className="" >
                                        <Plus width={16} height={16} />
                                    </Button> : (
                                        <Button type="button" onClick={handleCloseSchedule} variant={'outline'} className="" >
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
                                                <Select name="timeFrom" onValueChange={(value) => handleChangeSchedule('timeOut', value)}>
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
                                                <Select name="timeTo" onValueChange={(value) => handleChangeSchedule('timeIn', value)}>
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

                                <ul className="mt-2  text-primary text-sm ">
                                    {
                                        getValues('schedule')?.map((schedule, index) => (
                                            <li key={index} className="flex items-center justify-between gap-4">
                                                <div className="flex items-center gap-2">
                                                    <Calendar width={14} /> <span className="capitalize">{formatTextSchedule(schedule)}</span>
                                                </div>
                                                <div className="flex items-center text-gray-400">
                                                    <Button type="button" onClick={() => handleRemoveSchedule(index)} variant={'ghost'} size={'icon'}> <Trash width={12} height={12} /> </Button>
                                                </div>
                                            </li>
                                        ))

                                    }
                                </ul>
                            </div>
                            <div>
                                <div className="flex items-center gap-4 justify-between">
                                    <div>
                                        <h2 className="font-medium flex items-center gap-2"> <Phone width={16} height={16} /> Contacto</h2>
                                        <p className="text-sm text-gray-400">Añade un contacto para la sucursal</p>
                                    </div>
                                    {!addContact && <Button type="button" onClick={() => setaddContact(true)} variant={'outline'} size={'icon'} className="" >
                                        <Plus width={16} height={16} />
                                    </Button> 
                                        }
                                     
                                       {(getValues('contact').length !== 0 && addContact) && <Button type="button" onClick={handleCloseContact} variant={'outline'} className="" >
                                            Cancelar
                                        </Button>}
                                    
                                </div>
                                { addContact && (
                                    <div className="space-y-1 mt-4">
                                        <div className={`grid gap-4 grid-cols-[160px_1fr]`}>
                                            <div>
                                                <Label htmlFor="type" className="inline-block mb-2">Tipo</Label>
                                                <Select name="type" onValueChange={(value) => handleChangeContact('type', value)}>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Selecciona el tipo" />
                                                    </SelectTrigger>
                                                    <SelectContent >
                                                        <SelectGroup>
                                                            <SelectLabel>Selecciona tipo de telefono</SelectLabel>
                                                            <SelectItem value="tel">Telefono</SelectItem>
                                                            <SelectItem value="cel">Celular</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div>
                                                <Label htmlFor="number" className="inline-block mb-2">Numero</Label>
                                                <Input type="text" placeholder="(999) 392 9492" name="number" className="h-9" onChange={(e) => handleChangeContact('number', e.target.value)} />
                                            </div>

                                        </div>

                                        <Button onClick={handleSaveContact} type="button" variant={'outline'} className="mt-4 ml-auto flex">
                                            <Plus width={16} height={16} />
                                            Añadir numero
                                        </Button>
                                    </div>
                                )}
                                <ul className="mt-2 text-gray-400 text-sm space-y-1 ">
                                    {
                                        getValues('contact')?.map((contact, index) => (
                                            <li key={index} className="flex items-center gap-2 justify-between">
                                                <div className="flex items-center gap-2">
                                                    <Phone width={14} /> <span className="capitalize">{contact.type}: {contact.number}</span>
                                                </div>                                                
                                                <Button type="button" onClick={() => handleRemoveContact(index)} variant={'ghost'} size={'icon'}> <Trash width={12} height={12} /> </Button>
                                            </li>
                                        ))
                                    }

                                </ul>
                            </div>
                        </div>

                        <Button type="submit" variant={'dashboard'} className="mt-4 ml-auto flex">
                            <Pencil width={16} height={16} />
                            Editar
                        </Button>
                    </form>
                </Form>

            </div>
        </div>
    )
}
