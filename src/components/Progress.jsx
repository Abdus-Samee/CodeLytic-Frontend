import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Progress = ({ token }) => {
    const navigate = useNavigate()
    
    useEffect(() => {
        if(!token){
            navigate('/login')
        }
    }, [])

    return (
        <div>
            <h1>User Progress</h1>
        </div>
    )
}

export default Progress