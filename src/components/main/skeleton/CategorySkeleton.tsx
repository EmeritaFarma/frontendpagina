import { Skeleton } from "@/components/ui/skeleton";

const CategorySkeleton = () => {
    return (
      <div className="aside__skeleton">
      <Skeleton className="h-8 mb-4 max-w-[120px]" />
        <ul className="aside__skeleton-list">
          {[1, 2, 3, 4, 5].map((item) => (
            <Skeleton key={item} className="h-12" />
          ))}
        </ul>
      </div>
    );
  };

export default CategorySkeleton;