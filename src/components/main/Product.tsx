import { Product as ProductType } from "@/lib/types/product";
import { Link } from "react-router-dom";

interface Props {
    product: ProductType;
}

export default function Product({ product }: Props) {

    const { name, priceBase, priceDiscount, category , id , image} = product;

    const priceDiscountFormat = priceDiscount ? Number(priceDiscount) : 0
    const imagen =  `${import.meta.env.VITE_API_URL}/${image}`

    const link = id.toString();
    return (
        <Link to={link} className="product" viewTransition>
            <figure className="product__figure">
                {
                    imagen ? (
                        <img className="product__image" src={imagen} alt={`image of ${image}`} />
                    ) : (
                        <div className="product__image-sckeleto">
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-image"><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" /></svg>
                        </div>
                    )
                }
                <div className="product__link">Ver detalles</div>
            </figure>
            <div className="product__body">
                <h3 className="product__title" >{name}</h3>
                <p className="product__category">{category?.name}</p>
                <div className="product__prices">
                    {priceDiscountFormat > 0 && <p className="product__price-discount">${priceBase}</p>}
                    <p className="product__price">${priceDiscountFormat > 0 ? priceDiscountFormat : priceBase}</p>
                </div>
            </div>
            {priceDiscount > 0 && <p className="product__offer">
                ¡Oferta!
            </p>}
        </Link>
    )
}
