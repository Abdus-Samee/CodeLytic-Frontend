import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Container, CircularProgress, Snackbar, Button } from "@mui/material"

import { loadAllCourses, updateCourse, deleteCourse, makeLive, makePremium } from "../../services/course-service"

import '../../assets/css/admin.css'

const Course = ({token}) => {
    const [loading, setLoading] = useState(true)
    const [courses, setCourses] = useState([])
    const [open, setOpen] = useState(false)
    const [msg, setMsg] = useState('')

    useEffect(() => {
        loadAllCourses().then((data) => {
            // console.log(data)
            setCourses(data)
            setLoading(false)
        }).catch((e) => console.log(e))
    }, [])

    const handleUpdateCourse = (courseId, action) => {
        const course = courses.find((course) => course.id === courseId)
        
        const customHeaders = {
            Authorization: 'Bearer ' + token
        }

        setOpen(true)
        
        if(action === "live") {
            setMsg('Changing course live status...')
            course.live = true

            makeLive(courseId, customHeaders).then((res) => {
                console.log(res)
                const updated = [...courses]
                const index = updated.findIndex((c) => course.id === c.id)
                if(index !== 1){
                    updated[index] = course
                    setCourses(updated)
                }

                setMsg('Updated course status successfully...')
                setOpen(false)
            }).catch((e) => console.log(e))
        }else if(action === "premium") {
            setMsg('Changing course premium status...')
            course.premium = !course.premium

            makePremium(courseId, customHeaders).then((res) => {
                console.log(res)
                const updated = [...courses]
                const index = updated.findIndex((c) => course.id === c.id)
                if(index !== 1){
                    updated[index] = course
                    setCourses(updated)
                }

                setMsg('Updated course status successfully...')
                setOpen(false)
            }).catch((e) => console.log(e))
        }
    }

    const handleDelete = (courseId) => {
        setOpen(true)
        setMsg('Deleting course...')

        const customHeaders = {
            Authorization: 'Bearer ' + token,
        }

        deleteCourse(courseId, customHeaders).then((data) => {
            console.log(data)
            const filtered = courses.filter((course) => course.id !== courseId)
            setCourses(filtered)
            setMsg('Course deleted successfully')
            setOpen(false)
        }).catch((e) => {
            console.log(e)
            setMsg('Error deleting course')
        })
    }

    return (
        <>
            {loading ? <CircularProgress style={{ color: 'pink', marginLeft: '50%', marginTop: '15%', }} /> : 
                <Container>
                    <div className="admin-courses">
                        {courses.map((course, key) => (
                            <div key={key} className="admin-course">
                                <img className="admin-course-image" src={course.icon} alt="course" />
                                <div className="admin-course-title">{course.title}</div>
                                <div className="admin-course-author">{course.author}</div>
                                <div>
                                    <Button variant="contained" color="warning" style={{ marginTop: '1vh', marginLeft: '1vw', }} onClick={() => handleUpdateCourse(course.id, "live")}>{course.live === true? 'Live' : 'Not Live'}</Button>
                                    <Button variant="contained" color="info" style={{ marginTop: '1vh', marginLeft: '1vw', }} onClick={() => handleUpdateCourse(course.id, "premium")}>{course.premium === true? 'Premium' : 'Not Premium'}</Button>
                                    <Button variant="contained" color="error" style={{ marginTop: '1vh', marginLeft: '35%', }} onClick={() => handleDelete(course.id)}>Delete</Button>
                                </div>                            
                            </div>
                        ))}
                    </div>
                    <Snackbar
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                        open={open}
                        onClose={() => setOpen(false)}
                        key="bottomcenter"
                    >
                        <div style={{ background: '#5765FF', padding: '0.5rem 5rem', borderRadius: '10px', }}>
                            <span 
                                style={{
                                    display: 'inline',
                                    color: '#000',
                                    fontFamily: '"DM Mono", monospace',
                                }}>
                                    {msg}
                            </span>
                            <CircularProgress style={{ height: '10%', width: '10%', color: 'yellow', marginLeft: '45%', }} />
                        </div>
                    </Snackbar>
                </Container>
            }
        </>
    )
}

export default Course