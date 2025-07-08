import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ImageUp } from "lucide-react";
import { DragEvent, useRef, useState } from "react";
import DragImageDetails from "./DragImageDetails";
import { Input } from "@/components/ui/input";

interface Props {
    message?: string;
    onChangeValue?:(value: string) => void;
    value?: imagenType;
    file?: File | null;
    onChangeFile?: (file: File| null) => void;
}


interface imagenType {
    url: string,
    name: string,
    size: number,
    type: string
}

export default function DragImageInput({  message = '' , onChangeValue, value , onChangeFile }: Props) {


    const [isDragging, setIsDragging] = useState(false);
    const [imagen, setImagen] = useState<imagenType | null>(value ? { ...value } : null)
    const fileRef = useRef<HTMLInputElement>(null);

    const onDragEnter = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(true)
    }

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };


    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const files = e.dataTransfer.files;
        files && uploadImage(files)
        
    }

    const handleRemoveImage = () => {
        setImagen(null)
        onChangeValue?.('')
        onChangeFile?.(null)
    }


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        files && uploadImage(files)
    }

    function uploadImage(files: FileList) {
        
        if (files?.length > 0) {
            const file = files[0];

            if (!file.type.startsWith('image')) {
                return
            }

            if (imagen && imagen.url) {
                URL.revokeObjectURL(imagen.url)
            }

            const newImg = {
                url: URL.createObjectURL(file),
                name: file.name,
                size: file.size,
                type: file.type
            }


            setImagen(newImg)
            onChangeValue?.(newImg.name)
            onChangeFile?.(file)
        };
    }

    console.log(imagen);
    
    return (
        <div>
            <div className="space-y-4">
                <div>
                    <Label className="">Imagen</Label>
                    <div
                        onDragEnter={onDragEnter}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        className={`mt-2 border-2  rounded-lg p-2 transition-all duration-300  border-dashed h-36 flex items-center justify-center gap-2 flex-col ${isDragging ? 'border-cyan-700 bg-cyan-50/40' : 'border-gray-300 bg-white'}`}>
                        <div className="size-14 text-cyan-800 mb-1 flex justify-center items-center rounded-full bg-cyan-800/5 border border-cyan-800/15">
                            <ImageUp />
                        </div>
                        {
                            isDragging ? (
                                <p className="text-sm text-cyan-800">Suelta tu imagen aquí</p>
                            ) : (
                                <p className="text-sm text-gray-400">Arrastra tu imagen o <Button type="button" onClick={() => fileRef.current?.click()} className="p-0 h-auto  text-cyan-800 text-sm" variant={'link'} >elige tu imagen</Button> para subir</p>
                            )
                        }
                    </div>
                    {message && <p className="text-sm text-red-400 mt-2">{message}</p>}
                </div>
                {imagen && (<DragImageDetails name={imagen.name} src={imagen.url} remove={handleRemoveImage} />)}
            </div>
            <Input ref={fileRef} type="file" name="file" id="file" className="hidden" onChange={handleFileChange} />
        </div>
    )
}
