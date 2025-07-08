import Container from "@/components/Container";
import Banner from "@/components/main/Banner";
import { QuoterPDF } from "@/components/main/QuoterPDF";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { ArrowDownToLine, Image, Minus, Plus, ScanLine } from "lucide-react";
import { useMemo } from "react";

export default function CartDetails() {

    const { items, addItem, updateQuantity, getTotalPriceWithoutDiscount } = useCart()

    const totalPrice = useMemo(() => getTotalPriceWithoutDiscount(), [items])
    console.log(items);
    
  return (
    <>
    <Banner title="Cotizador" />
    <div className="py-14">
        <Container>
        
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_380px] ">
                <div className="border p-6 border-black/10 rounded-xl">
                    <h3 className="text-lg font-medium flex items-center gap-3">  <ScanLine size={22} />Productos</h3>
                    <div className="grid gap-2 mt-2">
                        {
                            items.map((product) => (
                                <article className="py-4 flex justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <figure className="w-24 h-24 relative">
                                        <div className="cart__detail-skeleton">
                                            <Image size={20} />
                                        </div>
                                        {/* <img className="w-full h-full object-center" src="https://www.emeritafarmacias.com/wp-content/uploads/8904103340372.png" alt="" /> */}
                                    </figure>
                                    <div>
                                        <h3 className="text-sm text-gray-400">{product.category?.name}</h3>
                                        <p className="text-black font-medium text-lg">{product.name}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-between items-end">
                                    <div className="flex items-center gap-1">
                                        <p className="font-medium text-xl">${product.price}</p>
                                        {product.quantity >  0 && <span className="text-sm text-gray-400">x{product.quantity}</span>}
                                    </div>
                                    <div className="flex items-center bg-white shadow-md shadow-black/5 rounded border border-black/5">
                                        <button onClick={() => updateQuantity(product.id, product.quantity - 1)} className="size-8 grid place-items-center transition-opacity duration-300 hover:opacity-50">
                                            <Minus size={16} />
                                        </button>
                                        <div className="text-sm size-8 grid place-items-center">
                                            <span>{product.quantity}</span>
                                        </div>
                                        <button onClick={() => addItem(product)} className="size-8 grid place-items-center transition-opacity duration-300 hover:opacity-50">
                                            <Plus size={16} />
                                        </button>
                                    </div>
                                </div>
                            </article>
                            ))
                        }
                      

                    </div>
                </div>
                <aside className="border p-6 border-black/10 rounded-xl">
                    <h3 className="text-lg font-medium">Detalles</h3>
                    <ul className="space-y-1 mt-4">	
                        <li className="flex justify-between items-center gap-4 text-sm text-gray-400">
                            <span>Subtotal</span>
                            <span className="">${totalPrice}</span>
                        </li>
                        <li className="flex justify-between items-center gap-4 text-black font-medium">
                            <span>Total</span>
                            <span className="">${totalPrice}</span>
                        </li>
                    </ul>
                   
                        <Button asChild className="w-full mt-6" size={'lg'}>
                    <PDFDownloadLink document={<QuoterPDF products={items} total={totalPrice} />} fileName="cotizacion.pdf">
                            <ArrowDownToLine size={20} />
                            Generar cotizacion
                    </PDFDownloadLink>
                    
                        </Button>
                </aside>
            </div>
        </Container>
    </div>
    </>
  )
}
