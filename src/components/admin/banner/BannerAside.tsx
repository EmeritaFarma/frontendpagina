import { cn } from "@/lib/utils";

interface Props {
    children: React.ReactNode;
    className?: string;
    
}

export default function BannerAside({ children, className = '' }: Props) {
    return (
        <aside className={cn("grid gap-4 ", className)}>
                {children}
        </aside>
    )
}
