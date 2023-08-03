import { useParams, useLocation, useNavigate } from "react-router-dom"

import "../assets/css/course.css"

const UserCourses = () => {
    const params = useParams()
    const location = useLocation()
    const navigate = useNavigate()
    const userId = params.id
    const { courseName, desc } = location.state

    const editCourseInfo = () => {
        navigate('/create/course', {
            state: {
                courseName,
                desc
            }
        })
    }

    const addLecture = () => {
        navigate('/create/course-content')
    }

    const addQuiz = () => {
        
    }

    return(
        <div>
            <h1>User {userId} Courses</h1>
            <div className="course-cards">
                <div className="course-card">
                    <h2>{courseName}</h2>
                    <p>{desc}</p>
                    <button onClick={editCourseInfo}>Edit Course Info</button>
                    <button onClick={addLecture}>Add Lecture</button>
                    <button onClick={addQuiz}>Add Quiz</button>
                </div>
            </div>
        </div>
    )
}

export default UserCourses