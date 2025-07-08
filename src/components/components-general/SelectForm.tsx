import React from 'react'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Select, SelectContent, SelectTrigger, SelectValue } from '../ui/select'
import { Control } from 'react-hook-form';
interface Props extends React.ComponentPropsWithoutRef<'select'> {
    control: Control<any>;
    placeholder: string;
    name: string;
    label: string;
    children: React.ReactNode;
}
export default function SelectForm({ control, placeholder, name, label,children }: Props) {
  return (
    <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <FormControl>
            <SelectTrigger className='w-full'>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {children}
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    )}
  />

  )
}
