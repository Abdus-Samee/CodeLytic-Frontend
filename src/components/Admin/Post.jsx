import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { CircularProgress } from "@mui/material"

import { loadAllCourses } from "../../services/course-service"

import '../../assets/css/admin.css'

const Post = () => {
    const [loading, setLoading] = useState(true)
    const [posts, setPosts] = useState([])

    useEffect(() => {
        
    }, [])

    return (
        <>
            {loading ? <CircularProgress style={{ color: 'pink', marginLeft: '50%', marginTop: '15%', }} /> : 
                <div>Post...</div>
            }
        </>
    )
}

export default Post