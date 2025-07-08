import { Control } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

interface Props extends React.ComponentPropsWithoutRef<'input'> {
    control: Control<any>;
    placeholder: string;
    name: string;
    label: string;
}

export default function InputForm({ control, placeholder, name, label, ...props }: Props) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Input placeholder={placeholder} {...props} {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
