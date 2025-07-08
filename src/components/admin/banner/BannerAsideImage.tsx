import { Button } from "@/components/ui/button";
import { AlignJustify} from "lucide-react";

interface Props {
    index: number;
    src: string;
    modeEdit: boolean;
    setIndexImg: React.Dispatch<React.SetStateAction<number | null>>;
    indexImg: number | null;
    onDragStart: (e: React.DragEvent<HTMLElement>, index: number) => void;
    onDragEnter: (e: React.DragEvent<HTMLElement>, index: number) => void;
    onDragLeave: (e: React.DragEvent<HTMLElement>) => void;
    onDragOver: (e: React.DragEvent<HTMLElement>) => void;
    onDrop: (e: React.DragEvent<HTMLElement>, index: number) => void;
    id: number;
}


export default function BannerAsideImage({ index, src, modeEdit, setIndexImg, indexImg, onDragStart, onDragEnter, onDragLeave, onDragOver, onDrop}: Props) {
    return (
        <figure
        
            onDragStart={(e) => onDragStart(e, index)}
            onDragEnter={(e) => onDragEnter(e, index)}
            onDragLeave={onDragLeave}
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, index)}
            role="button"
            onClick={() => setIndexImg(index)}
            key={index}
            className={`banner-aside-img relative cursor-pointer rounded-md p-1 bg-white border-2  h-32 border-dashed hover:border-cyan-700  transition-colors duration-300 group/img ${index === indexImg ? 'border-cyan-700' : 'border-gray-300'}`}>
            <img className="w-full h-full object-cover rounded-md " src={`${import.meta.env.VITE_API_URL}/${src}`} alt="" />
            {modeEdit && (
                <Button
                    size={'icon'}
                    variant={'dashboard'}
                    className="absolute pointer-events-none top-2 right-2 opacity-0 transition-opacity group-hover/img:opacity-100">
                    <AlignJustify />
                </Button>
            )}
          
        </figure>
    )
}
