import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import transition from "../../transition"

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

export default transition(Progress)