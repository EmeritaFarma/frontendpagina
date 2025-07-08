import Banner from "@/components/main/Banner";
import Product from "@/components/main/Product";
import { Link, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/services/category.services";
import CategorySkeleton from "@/components/main/skeleton/CategorySkeleton";
import ProductSkeleton from "@/components/main/skeleton/ProductSkeleton";
import { getProducts } from "@/services/product.services";
import { useEffect, useMemo, useState } from "react";
import { AlertCircle } from "lucide-react";
import Search from "@/components/main/Search";

interface LocationCurrent {
  latitude: number | null,
  longitude: number | null,
}


export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryCurrent = searchParams.get('category') ?? ''
  const { data:categories , isLoading} = useQuery({ queryKey: ['categories'], queryFn: getCategories})
  const { data:products , isLoading:isLoadingProducts} = useQuery({ queryKey: ['products'], queryFn: () => getProducts()})
  
      const [_locationCurrent, setlocationCurrent] = useState<LocationCurrent>({
          latitude: null,
          longitude: null,
      })

   useEffect(() => {
          navigator.geolocation.getCurrentPosition((position) => {
              setlocationCurrent({
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
              })
          }, (error) => {
              console.log(error)
          })
      }, [])
  

  const handleChangeCategory = (category:string) => {
    setSearchParams({
      category
    })
  }

  const productsByCategory = useMemo(() => {
    if(!categoryCurrent) return products
    return products?.filter(product => product.category?.name === categoryCurrent)
  }, [categoryCurrent, products])
  
  return (
    <div>
      <Banner title="Productos" />
      <main className="main">
        <div className="container">
            <div className="main__body">
                <aside className="aside">
                    <nav className="aside__nav">
                        {isLoading ? (
                          <CategorySkeleton />
                        ) : (
                          <>
                            <Search />
                            <h2 className="aside__subtitle">Categorías</h2>
                            <ul className="aside__list">
                                {categories?.map((category, index) => (
                                    <li key={index} className={`aside__item`}>
                                      <button onClick={() => handleChangeCategory(category.name)} className={`aside__link ${category.name === categoryCurrent ? 'active' : ''}`} >{category.name}</button>
                                    </li>
                                ))}
                            </ul>
                          </>
                        )}
                    </nav>
                </aside>
                <section className="main__products">
                    <div className="main__pages">
                        <Link to={'/products'} className="main__page">Inicio</Link>
                        <p>/</p>
                        {
                          categoryCurrent ? (
                            
                              <Link className="main__page active" to="#">{categoryCurrent}</Link>
                            
                          ) : <p>Productos</p>
                        }
                    </div>
                    {isLoadingProducts ? (
                      <ProductSkeleton />
                    ) : (
                      <div className="main__grid">
                        {productsByCategory?.map((product, index) => (
                          <Product key={index} product={product} />
                        ))}
                      </div>
                    )}
                       {
                          productsByCategory?.length === 0 && <p className="text-sm text-gray-400 flex items-center gap-2">
                            <AlertCircle className="w-4 h-4" />
                            No hay productos para mostrar
                          </p>
                        }
                </section>
            </div>
        </div>
    </main>
    </div>
  )
}
