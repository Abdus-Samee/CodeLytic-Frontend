import { useParams, useLocation } from "react-router-dom"

const UserCourses = () => {
    const params = useParams()
    const location = useLocation()
    const userId = params.id
    const { courseName, desc } = location.state

    return(
        <div>
            User Courses : {userId}
            <h4>{courseName}</h4>
            <p>{desc}</p>
        </div>
    )
}

export default UserCourses