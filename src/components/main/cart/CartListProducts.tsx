import { useCart } from "@/hooks/use-cart"
import CartItem from "./CartItem"

export default function CartListProducts() {

    const { items} = useCart()

    return (
        <div className="cart__products">
            {items.map((item) => <CartItem key={item.id} product={item} />)}
        </div>
    )
}
