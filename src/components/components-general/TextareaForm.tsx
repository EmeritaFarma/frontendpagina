import { Control } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Textarea } from "../ui/textarea";

interface Props extends React.ComponentProps<"textarea"> {
    control: Control<any>;
    placeholder: string;
    name: string;
    label: string;
}

export default function TextareaForm({ control, placeholder, name, label, ...props }: Props) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Textarea placeholder={placeholder} {...field} {...props} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
