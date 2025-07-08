import Autoplay from "embla-carousel-autoplay"
import {
    Carousel,
    CarouselContent,
    CarouselItem
} from "@/components/ui/carousel"
import { type CarouselApi } from "@/components/ui/carousel"
import {  useState } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "../ui/button"
import useBanner from "@/hooks/use-banner"
import LoadingCarrucel from "./LoadingCarrucel"

export default function Carrucel() {
    const [api, setApi] = useState<CarouselApi>() 
    const { data, loading } = useBanner()

    if (loading) return <LoadingCarrucel />

    return (
        <div className="max-w-5xl mx-auto mt-10">
        <Carousel setApi={setApi} plugins={[
            Autoplay({
                delay: 8000,
            })
        ]} opts={{
            loop: true
        }}>
				   <CarouselContent>
		  {Array.isArray(data) && data.map((banner, index) => (
			<CarouselItem key={index}>
			  <img
				className="news__image"
				src={`${import.meta.env.VITE_API_URL}/${banner.image}`}
				alt=""
			  />
			</CarouselItem>
		  ))}
		</CarouselContent>

        </Carousel>
        <div className="flex justify-end items-center gap-4 mt-6">
            <Button size={'icon'} variant={'secondary'} className="size-12 md:size-14"  onClick={() => api?.scrollPrev()}> 
                <ArrowLeft/>
            </Button>
            <Button size={'icon'} variant={'secondary'} className="size-12 md:size-14"  onClick={() => api?.scrollNext()}> 
                <ArrowRight/>
            </Button>
        </div>
        </div>

    )
}
