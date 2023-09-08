import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Container, CircularProgress, Button } from "@mui/material"

import { loadAllCourses, deleteCourse } from "../../services/course-service"

import '../../assets/css/admin.css'

const Course = ({token}) => {
    const [loading, setLoading] = useState(true)
    const [courses, setCourses] = useState([])

    useEffect(() => {
        loadAllCourses().then((data) => {
            // console.log(data)
            setCourses(data)
            setLoading(false)
        })
    }, [])

    const handleDelete = (courseId) => {
        const customHeaders = {
            Authorization: 'Bearer ' + token,
        }

        deleteCourse(courseId, customHeaders).then((data) => {
            console.log(data)
        }).catch((e) => console.log(e))
    }

    return (
        <>
            {loading ? <CircularProgress style={{ color: 'pink', marginLeft: '50%', marginTop: '15%', }} /> : 
                <Container>
                    <div className="admin-courses">
                        {courses.map((course, key) => (
                            <div key={key} className="admin-course">
                                <img className="admin-course-image" src={course.image} alt="course" />
                                <div className="admin-course-title">{course.title}</div>
                                <div className="admin-course-author">{course.author}</div>
                                <div>{course.live === true? 'Live' : 'Not Live'}</div>
                                <div>{course.premium === true? 'Premium' : 'Not Premium'}</div>
                                <Button variant="contained" color="warning" onClick={() => handleDelete(course.id)}>Delete</Button>
                            </div>
                        ))}
                    </div>
                </Container>
            }
        </>
    )
}

export default Course