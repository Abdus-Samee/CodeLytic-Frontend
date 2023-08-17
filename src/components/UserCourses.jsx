import { useParams, useLocation, useNavigate } from "react-router-dom"
import { Container } from "@mui/material"

import "../assets/css/profile.css"

const UserCourses = () => {
    const params = useParams()
    const location = useLocation()
    const navigate = useNavigate()
    const userId = params.id
    const { courseName, desc, img } = location.state
    const courses = [
        {
            courseName: "Dynamic Programming",
            img: "img1.jpg",
            desc: "Learn the art of solving dynamic programming problems.",
        },
        {
            courseName: "Searching",
            img: "img2.jpg",
            desc: "Master various searching algorithms and techniques.",
        },
        {
            courseName: "Sorting",
            img: "img3.jpg",
            desc: "Dive into the world of sorting algorithms and their implementations.",
        },
    ];

    const editCourse = () => {
        const courseId = 3
        navigate(`/course/${courseId}`, {
            state: {
                courseName,
                userId,
            }
        })
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
                {courses.map((course, k) => (
                    <div key={k} className="profile-card">
                        <div className="imgBx">
                            <img src={course.img} />
                        </div>
                        <div className="profile-content">
                            <div className="profile-details">
                                <h2>{course.courseName}</h2>
                                <div className="profile-data">
                                    <h3><span>{course.desc}</span></h3>
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
        </Container>
    )
}

export default UserCourses