import { Loader } from "lucide-react";
import { Button } from "../ui/button";

interface Props extends React.ComponentPropsWithoutRef<"button"> {
    children: React.ReactNode;
    loading?: boolean;
    variant?:'default'|'destructive'|'outline'|'secondary'|'ghost'|'link' | 'notion' | 'dashboard';
    loadingText?: string;
}

export default function ButtonForm({ children, loading = false,variant = 'dashboard',loadingText = 'Cargando...', ...props }: Props) {
  

  return (
    <Button variant={variant} {...props} disabled={loading}>
      {loading && <Loader className=" animate-spin" />}
      {loading ? loadingText : children}
    </Button>
  )
}
