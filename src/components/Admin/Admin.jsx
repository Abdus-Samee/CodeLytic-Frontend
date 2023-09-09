import { useEffect, useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

import Course from "./Course"
import User from "./User"
import Post from "./Post"

import { loadAllCourses } from "../../services/course-service"

import '../../assets/css/admin.css'

const Admin = ({ token }) => {
    const [courses, setCourses] = useState([])
    const [users, setUsers] = useState([])
    const [posts, setPosts] = useState([])
    const [view, setView] = useState("courses")
    const [loadingCourses, setLoadingCourses] = useState(true)
    const [loadingUsers, setLoadingUsers] = useState(true)
    const [loadingPosts, setLoadingPosts] = useState(true)

    const navigate = useNavigate()

    useEffect(() => {
        if(!token){
            navigate('/login')
        }

        const user = JSON.parse(localStorage.getItem('codelytic-user'))
        const { role } = user
        if(role !== 'ADMIN'){
            navigate('/')
        }
    
        const customHeaders = {
            Authorization: 'Bearer ' + token,
        }
    }, [])

    const handleTabClick = (e) => {
      setView(e.target.value)
    }
    
    return (
        <>
          <div className="admin-wrapper">
            <div className="admin-tabs">
                <div className={`admin-tab ${view === "courses" ? "admin-active-tab" : ""}`}>
                    <input type="radio" name="css-tabs" id="tab-1" value="courses" checked={view === "courses"} onChange={handleTabClick} className="admin-tab-switch" />
                    <label for="tab-1" className="admin-tab-label">Courses</label>
                </div>
                <div className={`admin-tab ${view === "users" ? "admin-active-tab" : ""}`}>
                    <input type="radio" name="css-tabs" id="tab-2" value="users" checked={view === "users"} onChange={handleTabClick} className="admin-tab-switch" />
                    <label for="tab-2" className="admin-tab-label">Users</label>
                </div>
                <div className={`admin-tab ${view === "posts" ? "admin-active-tab" : ""}`}>
                    <input type="radio" name="css-tabs" id="tab-3" value="posts" checked={view === "posts"} onChange={handleTabClick} className="admin-tab-switch" />
                    <label for="tab-3" className="admin-tab-label">Posts</label>
                </div>
            </div>
          </div>
          <hr />
          {view === "courses" &&
            <>
              <Course token={token} />
            </>
          }
          {view === "users" &&
            <>
              <User token={token} />
            </>
          }
          {view === "posts" &&
            <>
              <Post token={token} />
            </>
          }
        </>
    )
}

export default Admin