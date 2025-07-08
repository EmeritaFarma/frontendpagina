import { CartItem as CartItemType, useCart } from "@/hooks/use-cart"
import { Minus, Plus } from "lucide-react"

interface Props{
    product: CartItemType
}

export default function CartItem({product}: Props) {

    const { addItem, removeItem, updateQuantity } = useCart()
    const { name,quantity,id,price,image } = product

        
    
    
    return (
        <div className="cart__item">
            <img className="cart__image" src={`${import.meta.env.VITE_API_URL}/${image}`} alt="" />
            <div className="cart__body">
                <div className="cart__top">
                    <h5 className="cart__title">{name}</h5>
                    <button className="cart__remove" onClick={() => removeItem(id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></svg> 
                    </button>
                </div>
                <div className="cart__bottom">
                    <p className="cart__price">${price} 
                        {quantity > 1 ? <span className="cart__price-count"> x{quantity}</span> : null}
                    </p>
                    <div className="cart__action">
                        <button className="cart__action-item cart__btn" onClick={() => updateQuantity(id, quantity - 1)}>
                            <Minus width={10} height={10} />
                        </button>
                        <div className="cart__action-item cart__number">{quantity}</div>
                        <button className="cart__action-item cart__btn" onClick={() => addItem(product)}>
                            <Plus width={10} height={10} />
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}
