import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";

interface Props {
  className?: string;
  text?: string;
}

export default function Loading({ className = '', text }: Props) {
  return (
    <div className={cn("flex items-center gap-2 text-gray-400 text-sm",className)}>
        <Loader width={16} height={16} className="animate-spin" />
        <p>{text || 'Cargando...'}</p>
    </div>
  )
}
