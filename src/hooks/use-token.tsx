import { useEffect } from "react"

export default function useToken() {

    const token = localStorage.getItem('token')
    

    useEffect(() => {
        if (token) {
                    }
    }, [token])

  return (
    <div>use-token</div>
  )
}
