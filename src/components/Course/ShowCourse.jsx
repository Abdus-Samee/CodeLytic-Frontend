import { Box, Button, Chip, CircularProgress, Container, Divider, Modal } from '@mui/material'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from "react-router-dom"

import Subsection from './Subsection'

import { createSubsection, enrollCourse, loadSingleCourse } from '../../services/course-service'
import { getUser } from '../../services/user-service'
import transition from "../../transition"

import "../../assets/css/showcourse.css"

const styleContainer = {
    bgcolor: '#17141D',
    boxShadow: '-1rem 0 3rem #000',
    color: '#ffffff',
    padding: '1rem',
    borderRadius: '10px',
    marginTop: '5vh',
}
  
const styleTitleDiv = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
}

const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    bgcolor: 'orange',
    border: '2px solid #000',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
}

    const ShowCourse = ({ token }) => {
        const [course, setCourse] = useState({})
        const [isEnrolled, setIsEnrolled] = useState(false)
        const [loading, setLoading] = useState(true)
        const [subsectionLoading, setSubsectionLoading] = useState(false)
        const [subsection, setSubsection] = useState('')
        const [isOpen, setIsOpen] = useState(false)
        const [isAuthor, setIsAuthor] = useState(false)
        const [isAdmin, setIsAdmin] = useState(false)
        const [enrollLoading, setEnrollLoading] = useState(false)

        const params = useParams()
        const location = useLocation()
        const navigate = useNavigate()

        
        const handleOpen = () => {
            if(!token){
                navigate('/login')
            }

            setIsOpen(true)
        }

        const handleClose = () => setIsOpen(false)

        const courseId = params.courseId  

        useEffect(() => {
            loadSingleCourse(courseId).then((res) => {
                setCourse(res)
                console.log(res)
                const storedUser = localStorage.getItem('codelytic-user')
                const user = JSON.parse(storedUser)

                if(res.author === user?.email) setIsAuthor(true)
                if(user?.role === 'ADMIN') setIsAdmin(true)
                
                if(user?.enrolledCourse?.length > 0){
                    user.enrolledCourse.forEach(course => {
                        //course.id is number and courseId is string
                        if(course.id === parseInt(courseId)) setIsEnrolled(true)
                    })
                }

                setLoading(false)
            }).catch((e) => console.log(e))
        }, [])

    const handleEditInfo = () => {
        navigate('/create/course', {
            state: {
                courseName: course.title,
                desc: course.description,
                img: course.icon,
                selectTags: course.tags,
            }
        })
    }

    const handleSubsectionChange = (val) => {
        setSubsection(val)
    }

    const handleEnroll = () => {
        if(!token){
            navigate('/login')
        }

        setEnrollLoading(true)

        const customHeaders = {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        }

        enrollCourse(courseId, customHeaders).then((res) => {
            getUser(customHeaders).then((res) => {
                localStorage.setItem('codelytic-user', JSON.stringify(res))
                
                if(res?.enrolledCourse){
                    const enrolled = res.enrolledCourse.find(course => course.id === courseId)
                    if(enrolled) setIsEnrolled(true)
                }

                setEnrollLoading(false)
                window.location.reload()
            }).catch(e => console.log(e))
        }).catch((e) => console.log(e))
    }

    const handleSubsectionCreate = () => {
        if(!token){
            navigate('/login')
        }

        if (subsection === '') {
            alert('Subsection name cannot be empty')
            return
        }

        const customHeaders = {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        }

        setSubsectionLoading(true)
        createSubsection(courseId, subsection, customHeaders).then((res) => {
            setCourse(prevCourse => {
                return {
                    ...prevCourse,
                    subsections: [
                        ...prevCourse.subsections,
                        {
                            id: res.subsectionId,
                            name: subsection, 
                            lectures: [],
                            quiz: null
                        }
                    ]
                }
            })
            setSubsectionLoading(false)
            setSubsection('')
            handleClose()
        }).catch((e) => console.log(e))
    }

    return (
        <Container sx={styleContainer} className="course-info">
            {loading ? <CircularProgress style={{ color: 'pink', marginLeft: '50%', }} /> : 
            <>
                <img src={course.icon} alt={course.title} className="show-course-image" />
                <div style={styleTitleDiv}>
                    <h1 className="course-title">{course.title}</h1>
                    <div className="info">
                        <span>Created by: {course.author}</span>
                        {isAuthor && <Chip className="chip" label="Edit Info" onClick={handleEditInfo} />}
                    </div>
                </div>
                <p className="course-description">{course.description}</p>
                <div className="show-course-tags">
                    {course.tags && course.tags.map((tag, index) => <a key={index} className="course-tag-chip">{tag}</a>)}
                </div>
                <Divider variant="middle" color="pink" />
                {course.subsections.length > 0 && <Subsection token={token} course={course} isEnrolled={isEnrolled} isAuthor={isAuthor} isAdmin={isAdmin} />}
                {isAuthor && <Button variant="contained" color="secondary" style={{ marginTop: '1vh', }} onClick={handleOpen}>
                    Add Subsection
                </Button>}
                {!isAdmin && !isAuthor && token && !isEnrolled &&
                    <>
                        <Button variant="contained" color="secondary" disabled={enrollLoading} style={{ marginTop: '1vh', }} onClick={handleEnroll}>
                            Enroll
                        </Button>
                        {enrollLoading && <CircularProgress style={{ color: 'pink', marginLeft: '1vw', marginBottom: '-2vh', }} />}
                    </>
                }
                <Modal
                    open={isOpen}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={styleModal}>
                    <h1 id="subsection-modal-title">Create Subsection</h1>
                    <input className='subsection-modal-input' type='text' value={subsection} placeholder='Subsection Name' onChange={(e) => handleSubsectionChange(e.target.value)} required/>
                    <Button className='subsection-modal-button' variant="contained" size="small"  onClick={handleSubsectionCreate}>Create</Button>
                    {subsectionLoading && <CircularProgress style={{ color: 'pink', }} />}
                    </Box>
                </Modal>
            </>}
        </Container>
    )
}

export default transition(ShowCourse)