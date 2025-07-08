import { Button } from "@/components/ui/button";
import { Banner } from "@/lib/types/banner";
import { Trash } from "lucide-react";
import { Link } from "react-router-dom";

interface Props {
  data: Banner;
}
export default function BannerImage({ data }: Props) {
 
  return (
    <>
      <img className="w-full rounded-lg" src={`${import.meta.env.VITE_API_URL}/${data.image}`} alt="" />
      <Button asChild variant={'destructive'} className="absolute top-4 right-4 opacity-90 transition-opacity group-hover/img:opacity-100">
        <Link to={'?removeid=' + data.id}>
          <Trash />
        </Link>
      </Button>
    </>
  )
}
