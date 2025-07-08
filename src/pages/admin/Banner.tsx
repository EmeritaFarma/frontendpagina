import BannerPagination from "@/components/admin/banner/BannerActions";
import BannerAside from "@/components/admin/banner/BannerAside";
import BannerAsideImage from "@/components/admin/banner/BannerAsideImage";
import BannerGallery from "@/components/admin/banner/BannerGallery";
import BannerHeader from "@/components/admin/banner/BannerHeader";
import BannerImage from "@/components/admin/banner/BannerImage";
import BannerPlaceholder from "@/components/admin/banner/BannerPlaceholder";
import RemoveBanner from "@/components/admin/banner/RemoveBanner";
import { Button } from "@/components/ui/button";
import { Banner as BannerProps } from "@/lib/types/banner";
import { getBanners, updateBanner } from "@/services/banner.services";
import { CircleAlert } from "lucide-react";
import { DragEvent, useEffect, useMemo, useState } from "react";
import {  useSearchParams } from "react-router-dom";
import { toast } from "sonner";

export default function Banner() {

    const [data, setdata] = useState<BannerProps[]>([])
    const [dataBackup, setdataBackup] = useState<BannerProps[]>([])
    const [indexImg, setIndexImg] = useState<number | null>(null)
    const [modeEdit, setModeEdit] = useState(false)
    const [indexCurrent, setIndexCurrent] = useState<null | number>(null);
    const [indexR, setindexR] = useState<null | number>(null);
    const [count, setcount] = useState(0)
    const [searchParams] = useSearchParams()
    const onDragStart = (_e: DragEvent<HTMLElement>, index: number) => {
        if (!modeEdit) return
        setIndexCurrent(index)
    };
    const onDragEnter = (e: DragEvent<HTMLElement>, index: number) => {
        e.preventDefault();
        e.dataTransfer.effectAllowed = 'move';
        if (!modeEdit) return
        setindexR(index)

    };
    const onDragLeave = (e: DragEvent<HTMLElement>) => {
        e.preventDefault();
    };
    const onDragOver = (e: DragEvent<HTMLElement>) => {
        e.preventDefault();
    };
    const onDrop = (e: DragEvent<HTMLElement>) => {
        e.preventDefault()
        if (!modeEdit) return
        e.currentTarget.classList.remove('border')
        if (indexCurrent === indexR) {
            setIndexCurrent(null)
            return
        }

        const array = [...data]
        const item = array[indexCurrent as number]
        array.splice(indexCurrent as number, 1)

        array.splice(indexR as number, 0, item)
        setdata([...array])
        setIndexCurrent(null)
        setindexR(null)
        setIndexImg(indexR)

    };

    const onSubmit = async() => {
         const arraySorted = data.map((item, i) => ({ ...item, priority: i + 1 }))
        setdataBackup([...arraySorted])

        const message = await updateBanner(arraySorted)
        toast.success(message)

        setModeEdit(false)
    }

    const handleCancel = () => {
        setdata([...dataBackup])
        setModeEdit(false)
    }

    const refetch = () => setcount(count + 1)

    const isDifferentData = useMemo(() => dataBackup?.some((item: any, i) => item.image !== data[i]?.image), [dataBackup, data])

    useEffect(() => {
        if(!searchParams.get('removeid')) {
            
            getBanners().then((response) => {
                setdata(response)
                setdataBackup(response)
                setIndexImg(null)
            })
        }
    }, [searchParams, count])
    

    return (
        <div className='max-w-6xl'>
            <BannerHeader modeEdit={modeEdit} setModeEdit={setModeEdit} refetch={refetch} />
            <div className="grid grid-cols-[1fr_auto_250px] gap-6 items-start">
                <div>
                    <BannerGallery>
                        {indexImg === null ? <BannerPlaceholder /> : <BannerImage data={data?.[indexImg]}  />}
                    </BannerGallery>
                    {indexImg !== null && <BannerPagination index={indexImg} setIndex={setIndexImg} length={data.length} />}
                </div>
                <div className="w-[1px] h-full bg-gray-200"></div>
                <BannerAside>
                    {
                        data.length === 0 ? (
                            <div className="py-4 text-gray-500 text-sm flex items-center gap-2">
                                <CircleAlert width={16} height={16} />
                                <span>No hay banners por mostrar</span>    
                            </div>
                        ) : (
                            <>
                                <div className={`space-y-4 ${modeEdit ? ' border border-gray-300 p-2 rounded-xl' : ''}`}>
                                    {
                                        data?.map((image, index) => (
                                            <BannerAsideImage
                                                key={index}
                                                index={index}
                                                src={image.image}
                                                modeEdit={modeEdit}
                                                setIndexImg={setIndexImg}
                                                indexImg={indexImg}
                                                onDragStart={onDragStart}
                                                onDragEnter={onDragEnter}
                                                onDragLeave={onDragLeave}
                                                onDragOver={onDragOver}
                                                onDrop={onDrop}
                                                id={image.id}
                                            />
                                        ))
                                    }
                                </div>
                                <div className="grid gap-3">
                                    {
                                        isDifferentData && <Button onClick={onSubmit} variant={'dashboard'}>Guardar Cambios</Button>

                                    }

                                    {modeEdit && <Button onClick={handleCancel} variant={'outline'}>Cancelar</Button>}
                                </div>
                            </>
                        )
                    }

                </BannerAside>
            </div>
            <RemoveBanner />

        </div>
    )
}
