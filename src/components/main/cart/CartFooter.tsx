import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { useMemo } from "react";
import { Link } from "react-router-dom";

export default function CartFooter() {

    const { getTotalPriceWithoutDiscount,items } = useCart()

    const totalPrice = useMemo(() => getTotalPriceWithoutDiscount(), [items])

    return (
        <div className="cart__footer">
            <div className="cart__footer-item">
                <p className="cart__footer-text">Subtotal</p>
                <h5 className="cart__footer-price">${totalPrice}</h5>
            </div>
            <Button asChild className="w-full mt-4" size={'lg'}>
                <Link to="/cart">
                    Ver cotizador
                </Link>
            </Button>

        </div>
    )
}
