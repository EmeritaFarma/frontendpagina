import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
    index: number|null;
    setIndex: React.Dispatch<React.SetStateAction<number|null>>;
    length: number;
}

export default function BannerPagination({ index, setIndex, length }: Props) {

    if (index === null) return null

    return (
        <div className="flex items-center justify-center gap-4 mt-4">
            <Button onClick={() => setIndex(index - 1)} variant={'outline'} className="size-12" disabled={index === 0}>
                <ChevronLeft />
            </Button>
            <Button onClick={() => setIndex(index + 1)} variant={'outline'} className="size-12" disabled={index === length - 1}>
                <ChevronRight />
            </Button>
        </div>
    )
}
