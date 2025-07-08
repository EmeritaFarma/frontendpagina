import InputForm from "@/components/components-general/InputForm";
import TextareaForm from "@/components/components-general/TextareaForm";
import Banner from "@/components/main/Banner";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { validationContact } from "@/validation/contact";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";


export default function Contacts() {

    const form = useForm<z.infer<typeof validationContact>>({
        resolver: zodResolver(validationContact),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            commentGeneral: "",
            commentAdditional: "",
        },
    })

    const onSubmit = (values: z.infer<typeof validationContact>) => {
        console.log(values)
            }

    return (
        <>
            <Banner title="Contacto" />
            <main className="main-contact">
                <div className="container">
                    <div className="main-contact__body">
                        <p className="main-contact__text"> Si desea también llamarnos por teléfono o necesita enviar paquetería:</p>
                        <p className="main-contact__text main-contact__text--strong">Emérita Farmacias Oficinas</p>
                        <p className="main-contact__text">Calle 20 #91-E x 13 y 15. Colonia Chuburná de Hidalgo</p>
                        <p className="main-contact__text">Mérida, Yucatán, México, 97205</p>
                        <p className="main-contact__text"> Teléfono: (999) 924-0964</p>
                        <p className="main-contact__text"> comentarios@emeritafarmacias.com</p>
                        <Form {...form}  >
                            <form className="form" onSubmit={form.handleSubmit(onSubmit)}>
                                <div className="form__row">
                                    <div className="form__item">
                                        <InputForm control={form.control} placeholder="Nombre" name="name" label="Nombre" />
                                    </div>
                                    <div className="form__item">
                                        <InputForm control={form.control} placeholder="Email" name="email" label="Email" />
                                    </div>
                                </div>
                                <div className="form__row">
                                    <div className="form__item">
                                        <InputForm control={form.control} placeholder="Teléfono" name="phone" label="Teléfono" />
                                    </div>
                                    <div className="form__item">
                                        <InputForm control={form.control} placeholder="Comentario general" name="commentGeneral" label="Comentario general" />
                                    </div>
                                </div>
                                <TextareaForm className="h-24" control={form.control} placeholder="Comentarios adicionales" name="commentAdditional" label="Comentarios adicionales" />
                                <Button className="w-max ml-auto mt-4" size={'lg'}> Enviar </Button>
                            </form>

                        </Form>

                    </div>
                </div>
            </main>
        </>
    )
}
