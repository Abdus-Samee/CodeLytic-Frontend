import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { CircularProgress } from "@mui/material"

import { loadAllCourses } from "../../services/course-service"

import '../../assets/css/admin.css'

const Course = () => {
    const [loading, setLoading] = useState(true)
    const [courses, setCourses] = useState([])

    useEffect(() => {
        loadAllCourses().then((data) => {
            setCourses(data)
            setLoading(false)
        })
    }, [])

    return (
        <>
            {loading ? <CircularProgress style={{ color: 'pink', marginLeft: '50%', marginTop: '15%', }} /> : 
                <div>Course...</div>
            }
        </>
    )
}

export default Course