import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react"

interface imagenType {
    src: string,
    name: string,
    remove?: () => void
}

export default function DragImageDetails({name, src, remove}: imagenType) {
    return (
        <div className="border border-gray-300 rounded-lg p-1 h-16 flex items-center gap-4">
            <div className="flex-1 h-full flex items-center gap-4">
                <img src={src} alt="" className="h-full object-cover aspect-square   rounded-lg" />
                <p className="text-sm text-cyan-800">{name}</p>
            </div>
            <div className="px-2">
                <Button variant={'outline'} onClick={remove}><Trash /></Button>
            </div>
        </div>
    )
}
