interface Props {
    setshowCart: React.Dispatch<React.SetStateAction<boolean>>
}

export default function CartHeader({ setshowCart }: Props) {
    return (
        <h2 className="cart__header">
            <p>Carrito</p>
            <button className="cart__close" onClick={() => setshowCart(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg> 
            </button>
        </h2>
    )
}
