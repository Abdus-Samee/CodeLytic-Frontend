import { useParams, useLocation, useNavigate } from "react-router-dom"

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
        <div>
            <h3>User {userId} Courses</h3>
            <div class="card-container">
                {courses.map((course) => (
                    <div class="card">
                        <div class="imgBx">
                            <img src={course.img} />
                        </div>
                        <div class="content">
                            <div class="details">
                                <h2>{course.courseName}</h2>
                                <div class="data">
                                    <h3><span>{course.desc}</span></h3>
                                </div>
                                <div class="actionBtn">
                                    <button onClick={editCourse}>Edit Course</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default UserCourses