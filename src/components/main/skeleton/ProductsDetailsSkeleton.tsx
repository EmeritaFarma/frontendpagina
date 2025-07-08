import { Skeleton } from "@/components/ui/skeleton"

export default function ProductDetailsSkeleton() {
  return (
    <div className="product-details">
      <div className="container">
        <div className="mb-6">
          <Skeleton className="h-6 w-24" />
        </div>
        <div className="product-details__body">
          <div className="product-details__left">
            <Skeleton className="product-details__image w-full h-[400px]" />
          </div>
          <div className="product-details__right">
            <Skeleton className="h-8 w-full md:w-3/4 mb-4" />
            <div className="flex gap-2 mb-6">
              <Skeleton className="h-6 w-20 md:w-24" />
              <Skeleton className="h-6 w-20 md:w-24" />
            </div>
            <div className="product-details__actions flex flex-col md:flex-row gap-4">
              <div className="product-details__control flex gap-2">
                <Skeleton className="h-10 w-10 md:h-12 md:w-12" />
                <Skeleton className="h-10 w-10 md:h-12 md:w-12" />
                <Skeleton className="h-10 w-10 md:h-12 md:w-12" />
              </div>
              <Skeleton className="h-10 md:h-12 flex-1" />
            </div>
            <div className="product-details__text mt-6">
              <Skeleton className="h-4 w-28 md:w-32 mb-2" />
              <Skeleton className="h-4 w-36 md:w-48 mb-2" />
              <Skeleton className="h-4 w-32 md:w-40" />
            </div>
            <div className="product-details__socials flex gap-3 mt-6">
              <Skeleton className="h-7 w-7 md:h-8 md:w-8" />
              <Skeleton className="h-7 w-7 md:h-8 md:w-8" />
              <Skeleton className="h-7 w-7 md:h-8 md:w-8" />
              <Skeleton className="h-7 w-7 md:h-8 md:w-8" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
