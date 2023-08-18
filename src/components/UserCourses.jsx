import { useEffect, useState } from "react"
import { useParams, useLocation, useNavigate } from "react-router-dom"
import { Container, CircularProgress } from "@mui/material"

import { loadAllCourses } from "../services/course-service"

import "../assets/css/profile.css"

const UserCourses = () => {
    const [courses, setCourses] = useState([])
    const [loading, setLoading] = useState(true)

    const params = useParams()
    const location = useLocation()
    const navigate = useNavigate()
    const userId = params.id
    const author = 'John Doe'
    // const { courseName, desc, img } = location.state

    useEffect(() => {
        loadAllCourses().then((res) => {
            setCourses(res.filter(course => course.author === author))
            setLoading(false)
        }).catch(e => console.log(e))
    }, [])

    const editCourse = () => {
        const courseId = 3
        navigate(`/course/${courseId}`, {
            state: {
                courseName: 'Course Name',
                userId,
            }
        })
    }

    const truncateText = (text, length=50) => {
        if (text.length <= length) {
          return text;
        }
      
        return text.substr(0, length) + '\u2026'
    }

    const addLecture = () => {
        navigate('/create/course-content')
    }

    const addQuiz = () => {
        navigate('/create/course-quiz')
    }

    return (
        <Container>
            <h3 style={{ marginTop: '2vh', color: '#BEADFA',}}>Courses Created</h3>
            <div className="profile-card-container">
                {loading && <CircularProgress style={{ color: 'pink', margin: '0 auto', }} />}
                {courses.map((course, k) => (
                    <div key={k} className="profile-card">
                        <div className="imgBx">
                            <img src={course.icon} />
                        </div>
                        <div className="profile-content">
                            <div className="profile-details">
                                <h2>{course.title}</h2>
                                <div className="profile-data">
                                    <h3><span>{truncateText(course.description)}</span></h3>
                                </div>
                                <div className="profile-actionBtn">
                                    <button onClick={editCourse}>Edit Course</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <h3 style={{ marginTop: '2vh', color: '#BEADFA',}}>Courses Enrolled</h3>
            <div className="profile-card-container">
                {loading && <CircularProgress style={{ color: 'pink', margin: '0 auto', }} />}
                <p>No courses enrolled...</p>
            </div>
        </Container>
    )
}

export default UserCourses