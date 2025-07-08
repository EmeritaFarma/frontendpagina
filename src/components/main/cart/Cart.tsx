import { useCart } from "@/hooks/use-cart"
import { useMemo } from "react"
import CartEmpty from "./CartEmpty"
import CartHeader from "./CartHeader"
import CartFooter from "./CartFooter"
import CartListProducts from "./CartListProducts"

interface Props {
    setshowCart: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Cart({ setshowCart }: Props) {

    const { items, getTotalItems } = useCart()

    const totalItems = useMemo(() => getTotalItems(), [items])
    
    return (
        <div className="cart">
           <CartHeader setshowCart={setshowCart} />
            {totalItems === 0 ? (

               <CartEmpty />

            ) : (
                <>
                    <CartListProducts />
                    <CartFooter />
                </>
            )
            }
        </div>
    )
}
