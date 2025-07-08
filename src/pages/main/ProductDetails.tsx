import ProductDetailsSkeleton from "@/components/main/skeleton/ProductsDetailsSkeleton";
import ProductError from "@/components/main/error/ProductError";
import { Button } from "@/components/ui/button";
import { Product } from "@/lib/types/product";
import { getProductById } from "@/services/product.services";
import { ChevronLeft, Minus, Plus, ShoppingCart  } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useCart } from "@/hooks/use-cart";

export default function ProductDetails() {
    const { id } = useParams<{ id: string }>()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [product, setProduct] = useState<null | Product>(null)
    const {  addItem, getProductInCart, updateQuantity } = useCart()

    const fetchProduct = async () => {
        if (!id) return;
        
        try {
            setLoading(true);
            setError(null);
            const data = await getProductById(id);
            setProduct(data);
        } catch (error) {
            setError("No se pudo cargar el producto. Por favor, intente de nuevo.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [id]);

    if (loading) return <ProductDetailsSkeleton />;
    if (error) return <ProductError message={error} onRetry={fetchProduct} />;
    if (!product) return <ProductError message="Producto no encontrado" />;

    const { priceBase, priceDiscount, category, name, image } = product;

    const img = `${import.meta.env.VITE_API_URL}/${image}`
    

    const quantity = getProductInCart(product.id)?.quantity ?? 0
   
    return (
        <div className="product-details">
            <div className="container">
                <Link to={'/products'} viewTransition className="mb-6 group/back text-gray-400 text-sm flex items-center gap-1 transition-colors duration-300 hover:text-primary ">
                    <ChevronLeft className="transition-all group-hover/back:-translate-x-1 duration-300" />   
                    Regresar
                </Link>
                <div className="product-details__body">
                    <div className="product-details__left">
                        <img className="product-details__image" src={img} alt={product.name} />
                    </div>         
                    <div className="product-details__right">
                        <h2 className="product-details__title">{name}</h2>
                        <p className="product-details__price"> 
                            {priceDiscount > 0 && (
                                <span className="product-details__price--discount">${priceBase}</span>
                            )}
                            ${priceDiscount > 0 ? priceDiscount : priceBase}
                        </p>
                        <div className="product-details__actions">
                            <div className="product-details__control">
                                <button className="product-details__control-item" onClick={() => updateQuantity(product.id, quantity - 1)}>
                                    <Minus width={16} height={16} />
                                </button>
                                <div className="product-details__control-item">{quantity}</div>
                                <button className="product-details__control-item" onClick={() => addItem(product)}>
                                    <Plus width={16} height={16} />
                                </button>
                            </div> 
                            <Button onClick={() => addItem(product)} className="flex-1 h-12">Agregar al carrito <ShoppingCart /> </Button> 
                        </div>
                        <div className="product-details__text">
                            <p className="product-details__sku">
                                SKU: {product.sku || 'N/A'}
                            </p>
                            <div className="product-details__category">
                                <span>Categoria:</span>
                                <a className="product-details__category__link" href="#">{category?.name || 'Sin categoría'}</a>
                            </div>
                        </div>

                        <div className="product-details__socials">
                            <Link to="#" className="product-details__social">
                            <svg width={18} height={18} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M22.2125 5.65605C21.4491 5.99375 20.6395 6.21555 19.8106 6.31411C20.6839 5.79132 21.3374 4.9689 21.6493 4.00005C20.8287 4.48761 19.9305 4.83077 18.9938 5.01461C18.2031 4.17106 17.098 3.69303 15.9418 3.69434C13.6326 3.69434 11.7597 5.56661 11.7597 7.87683C11.7597 8.20458 11.7973 8.52242 11.8676 8.82909C8.39047 8.65404 5.31007 6.99005 3.24678 4.45941C2.87529 5.09767 2.68005 5.82318 2.68104 6.56167C2.68104 8.01259 3.4196 9.29324 4.54149 10.043C3.87737 10.022 3.22788 9.84264 2.64718 9.51973C2.64654 9.5373 2.64654 9.55487 2.64654 9.57148C2.64654 11.5984 4.08819 13.2892 6.00199 13.6731C5.6428 13.7703 5.27232 13.8194 4.90022 13.8191C4.62997 13.8191 4.36771 13.7942 4.11279 13.7453C4.64531 15.4065 6.18886 16.6159 8.0196 16.6491C6.53813 17.8118 4.70869 18.4426 2.82543 18.4399C2.49212 18.4402 2.15909 18.4205 1.82812 18.3811C3.74004 19.6102 5.96552 20.2625 8.23842 20.2601C15.9316 20.2601 20.138 13.8875 20.138 8.36111C20.138 8.1803 20.1336 7.99886 20.1256 7.81997C20.9443 7.22845 21.651 6.49567 22.2125 5.65605Z"></path></svg>
                            </Link>
                            <Link to="#" className="product-details__social">
                            <svg width={18} height={18} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M3.06364 7.50914C4.70909 4.24092 8.09084 2 12 2C14.6954 2 16.959 2.99095 18.6909 4.60455L15.8227 7.47274C14.7864 6.48185 13.4681 5.97727 12 5.97727C9.39542 5.97727 7.19084 7.73637 6.40455 10.1C6.2045 10.7 6.09086 11.3409 6.09086 12C6.09086 12.6591 6.2045 13.3 6.40455 13.9C7.19084 16.2636 9.39542 18.0227 12 18.0227C13.3454 18.0227 14.4909 17.6682 15.3864 17.0682C16.4454 16.3591 17.15 15.3 17.3818 14.05H12V10.1818H21.4181C21.5364 10.8363 21.6 11.5182 21.6 12.2273C21.6 15.2727 20.5091 17.8363 18.6181 19.5773C16.9636 21.1046 14.7 22 12 22C8.09084 22 4.70909 19.7591 3.06364 16.4909C2.38638 15.1409 2 13.6136 2 12C2 10.3864 2.38638 8.85911 3.06364 7.50914Z"></path></svg>
                            </Link>
                            <Link to="#" className="product-details__social">
                            <svg width={18} height={18} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M14 13.5H16.5L17.5 9.5H14V7.5C14 6.47062 14 5.5 16 5.5H17.5V2.1401C17.1743 2.09685 15.943 2 14.6429 2C11.9284 2 10 3.65686 10 6.69971V9.5H7V13.5H10V22H14V13.5Z"></path></svg>
                            </Link>
                            <Link to="#" className="product-details__social">
                            <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="currentColor"><path d="M13.3717 2.09442C8.42512 1.41268 3.73383 4.48505 2.38064 9.29256C1.02745 14.1001 3.42711 19.1692 8.00271 21.1689C7.94264 20.4008 7.99735 19.628 8.16502 18.8761C8.34964 18.0374 9.46121 13.4132 9.46121 13.4132C9.23971 12.9173 9.12893 12.379 9.13659 11.8359C9.13659 10.3509 9.99353 9.24295 11.0597 9.24295C11.4472 9.23718 11.8181 9.40028 12.0758 9.68981C12.3335 9.97934 12.4526 10.3667 12.402 10.751C12.402 11.6512 11.8236 13.0131 11.5228 14.2903C11.4014 14.7656 11.5131 15.2703 11.8237 15.65C12.1343 16.0296 12.6069 16.2389 13.0967 16.2139C14.9944 16.2139 16.2675 13.7825 16.2675 10.9126C16.2675 8.71205 14.8098 7.0655 12.1243 7.0655C10.826 7.01531 9.56388 7.4996 8.63223 8.40543C7.70057 9.31126 7.18084 10.5595 7.19423 11.859C7.16563 12.5722 7.39566 13.2717 7.84194 13.8287C8.01361 13.9564 8.07985 14.1825 8.00425 14.3827C7.9581 14.5673 7.84194 15.0059 7.79578 15.1675C7.77632 15.278 7.70559 15.3728 7.60516 15.4228C7.50473 15.4729 7.38651 15.4724 7.28654 15.4214C5.9019 14.8674 5.24957 13.3439 5.24957 11.6051C5.24957 8.75822 7.63424 5.3497 12.4036 5.3497C16.1998 5.3497 18.723 8.1273 18.723 11.0972C18.723 15.0059 16.5468 17.9451 13.3298 17.9451C12.3526 17.9761 11.4273 17.5061 10.8759 16.6986C10.8759 16.6986 10.2974 19.0146 10.1835 19.4531C9.95101 20.2099 9.60779 20.9281 9.16505 21.5844C10.0877 21.8643 11.0471 22.0044 12.0113 22C14.6636 22.0017 17.2078 20.9484 19.0829 19.072C20.958 17.1957 22.0099 14.6504 22.0069 11.9975C22.004 7.00306 18.3183 2.77616 13.3717 2.09442Z"></path></svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
