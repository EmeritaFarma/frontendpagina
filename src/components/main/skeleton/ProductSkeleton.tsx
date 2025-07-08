import { Skeleton } from "@/components/ui/skeleton";

const ProductSkeleton = () => {
  return (
    <div className="product-skeleton">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
          <div key={item} className="product-card-skeleton p-4 border rounded-lg">
            <Skeleton className="h-40 w-full mb-3" /> {/* Product image */}
            <Skeleton className="h-6 w-3/4 mb-2" /> {/* Product name */}
            <Skeleton className="h-5 w-1/2 mb-2" /> {/* Product price */}
            <div className="flex justify-between items-center mt-2">
              <Skeleton className="h-8 w-20" /> {/* Button */}
              <Skeleton className="h-6 w-6 rounded-full" /> {/* Icon */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSkeleton; 