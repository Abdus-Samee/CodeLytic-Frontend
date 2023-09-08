import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { CircularProgress } from "@mui/material"

import { loadAllCourses } from "../../services/course-service"

import '../../assets/css/admin.css'

const User = () => {
    const [loading, setLoading] = useState(true)
    const [users, setusers] = useState([])

    useEffect(() => {
        
    }, [])

    return (
        <>
            {loading ? <CircularProgress style={{ color: 'pink', marginLeft: '50%', marginTop: '15%', }} /> : 
                <div>User...</div>
            }
        </>
    )
}

export default User