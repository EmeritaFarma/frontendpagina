import React, { useEffect } from 'react'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Link } from 'react-router-dom'
import { getProducts } from '@/services/product.services'
import { Product } from '@/lib/types/product'

export default function Search() {

    const [search, setSearch] = React.useState<string>('')
    const time = React.useRef<ReturnType<typeof setTimeout> | null>(null)
    const [results, setResults] = React.useState<Product[]>([])

    const getResults = async (search: string) => {
        const data = await getProducts(search)
        console.log(data);
        
        setResults(data)
    }

    useEffect(() => {

        if (search.length > 0) {
            time.current && clearTimeout(time.current)
            time.current = setTimeout(() => {
                getResults(search);
            }, 500)
            return
        }
        if(time.current) {
            clearTimeout(time.current)
            time.current = null
            setResults([])
        }

    }, [search])

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)

    }

    const isEmpty = results.length === 0    

    return (
        <div className="mb-4 relative">
            <Label htmlFor="search" className="mb-2 inline-block text-sm">Buscar</Label>
            <Input type="search" id="search" placeholder="Buscar productos" onChange={handleSearch} />
            <div className='bg-white z-20 h-max w-full absolute top-[calc(100%+0.5rem)] left-0 right-0 rounded-md shadow-lg shadow-primary/10'>
                {
                    isEmpty && search && <p className='p-4 text-center text-foreground text-xs'>No se encontraron resultados</p>
                }

                {
                    !isEmpty && (results.map((product) => (
                        <Link key={product.id} to={`/products/${product.id}`} className='flex items-center gap-2 p-4 text-foreground text-xs transition duration-300 hover:text-primary last-of-type:border-b border-b-input'>
                            {product.name}
                        </Link>
                    )))
                }
                
            </div>
        </div>
    )
}
