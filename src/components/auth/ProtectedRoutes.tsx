import { verifyToken } from "@/services/user.services"
import { useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"


export default function ProtectedRoutes({ children }: { children: React.ReactNode }) {
  
    const token = localStorage.getItem('token')
    const [auth, setAuth] = useState(false)
    const navigate = useNavigate()
    
    if (!token) {
        localStorage.removeItem('token')
        return <Navigate to="/auth" />
    }

    useEffect(() => {
        verifyToken()
        .then(data => {
                        if (data.status === 'success') {
                setAuth(true)
            }
        }).catch(() => {
            localStorage.removeItem('token')
            navigate('/auth')
        })
    
    }, [])
    

    if (!auth) return null

    return children
}
