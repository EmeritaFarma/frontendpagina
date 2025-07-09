import { useMemo } from "react";
import { ShoppingCart } from "lucide-react";

import { useCart } from "@/hooks/use-cart";
import { cn } from "@/lib/utils";

interface Props {
  setshowCart: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CartButton({ setshowCart }: Props) {
  const { getTotalItems, items } = useCart();
  const totalItems = useMemo(() => getTotalItems(), [items]);

  return (
    <button
      onClick={() => setshowCart((prev) => !prev)}
      className="relative p-2 focus:outline-none"
    >
      {/* icono; hereda color del contenedor (blanco en móvil, negro en desktop) */}
      <ShoppingCart className="w-6 h-6 text-inherit" />

      {/* contador */}
      <div
        className={cn(
          "absolute -top-1 -right-1 text-[10px] min-w-[18px] h-[18px] grid place-content-center rounded-full bg-primary text-white",
          { hidden: totalItems === 0 }
        )}
      >
        {totalItems}
      </div>
    </button>
  );
}
