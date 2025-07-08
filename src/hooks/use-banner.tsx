import { Banner } from '@/lib/types/banner'
import { getBanners } from '@/services/banner.services'
import  { useEffect, useState } from 'react'

export default function useBanner() {
  
    const [data, setData] = useState<Banner[]>([])
    const [loading, setLoading] = useState(true)


    useEffect(() => {
      getBanners()
        .then((data) => {
          setData(data)
          setLoading(false)
        })
        .catch((error) => {
                  console.error(error)
                  })
    }, [])

    return {
      data,
      loading,
    }
}
