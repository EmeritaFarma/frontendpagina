import { clsx, type ClassValue } from "clsx"
import { LatLng } from "leaflet"
import { twMerge } from "tailwind-merge"
import { Contact } from "./types/contact"
import { ScheduleFilter, ScheduleWithBranch } from "./types/schedule"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTextSchedule({ dayFrom, dayTo, timeIn, timeOut }: { dayFrom?: string, dayTo?: string, timeIn?: string, timeOut?: string }) {

  const time = (timeIn && timeOut) ? `${formatHourWithAmPm(timeIn)} - ${formatHourWithAmPm(timeOut)}` : 'Cerrado'

  if(!dayTo){
    return `${dayFrom} • ${time}`
  }

  return `${dayFrom} a ${dayTo} • ${time}`
}


function formatHourWithAmPm(time: string) {

  const timeSplit = time.split(':');
  const hour = parseInt(timeSplit[0]);
  const minute = parseInt(timeSplit[1]);

  const period = hour >= 12 ? 'PM' : 'AM';
  
  const hour12 = hour > 12 ? hour - 12 : (hour === 0 ? 12 : hour);
  
  return `${hour12}:${minute.toString().padStart(2, '0')} ${period}`;
}


const regex = /^\d+-\d+\.(webp|jpg|jpeg|png)$/i;


export const validateImage = (name: string) => {
  return regex.test(name);
}

export async function createFileFromImageUrl(fileName = "image.webp") {
  try {

    const url = import.meta.env.VITE_API_URL + '/' + fileName
    // Hacer una solicitud para obtener la imagen como Blob
    const response = await fetch(url);
    if (!response.ok) throw new Error("No se pudo cargar la imagen");
    
    const blob = await response.blob();
    
    // Crear un objeto File a partir del Blob
    const file = new File([blob], fileName, { type: blob.type });
    
    return file;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export function generateLocation([lat, lng]: [number, number]) {

  const myLatLng = new LatLng(lat, lng);

  return myLatLng;
}

export function generateContacts(contact: Contact[]) {
  const numbers =contact?.reduce((acc, item) => {
    
    const array = acc[item.type] ? [...acc[item.type], item.number] : [item.number]
    
    return {
        ...acc,
        [item.type]: array
    }

}, {} as any) as { tel: string[], cel: string[] }

  return numbers

}

export function filterSchedule(data: ScheduleWithBranch[]) {

  if (!data?.length) return []

  const newData = data?.reduce((acc, item) => {
    const { dayFrom, dayTo, timeIn, timeOut } = item

    const findExist = acc.findIndex(j => j.id === item.branch.id)

    if (findExist === -1) {
      acc.push({ id: item.branch.id, name: item.branch.name, schedule: [{ dayFrom, dayTo, timeIn, timeOut }] })
      return acc
    }

    acc[findExist].schedule.push({ dayFrom, dayTo, timeIn, timeOut })

    return acc
  }, [] as ScheduleFilter[])

  return newData
}

export const formatTimePeriod = (time: string) => {
  
    const timeSplit = time.split(':');
    const hours = parseInt(timeSplit[0]);
    const minutes = parseInt(timeSplit[1]);

    return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes} ${hours >= 12 ? 'PM' : 'AM'}`
}