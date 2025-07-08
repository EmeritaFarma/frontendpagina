import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

interface Props {
    message?: string;
    onRetry?: () => void;
}

export default function ProductError({ message = "No se pudo cargar el producto", onRetry }: Props) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
            <AlertCircle className="w-12 h-12 text-destructive" />
            <p className="text-lg text-gray-600">{message}</p>
            {onRetry && (
                <Button onClick={onRetry} variant="outline">
                    Intentar de nuevo
                </Button>
            )}
        </div>
    );
} 