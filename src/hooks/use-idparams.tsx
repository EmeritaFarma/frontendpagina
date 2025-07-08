import { useLocation, useNavigate, useSearchParams } from "react-router-dom"

export const useIdParams = (search:string) => {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const id = searchParams.get(search)

    const redirect = () => {
        navigate(pathname,{replace: true})
    }

    return {
        id,
        redirect,
        pathname,
        navigate
    }
}