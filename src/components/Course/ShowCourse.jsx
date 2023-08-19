import { useState, useEffect } from 'react'
import { useParams, useLocation, useNavigate } from "react-router-dom"
import { Container, Divider, Button, Chip, Modal, Box, CircularProgress } from '@mui/material'

import Subsection from './Subsection'

import { loadSingleCourse, createSubsection } from '../../services/course-service'

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
    bgcolor: 'orange',
    border: '2px solid #000',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
  }

    const ShowCourse = ({ token }) => {
        const [course, setCourse] = useState({})
        const [loading, setLoading] = useState(true)
        const [subsectionLoading, setSubsectionLoading] = useState(false)
        const [subsection, setSubsection] = useState('')
        const [isOpen, setIsOpen] = useState(false)

        const params = useParams()
        const location = useLocation()
        const navigate = useNavigate()

        
        const handleOpen = () => setIsOpen(true)
        const handleClose = () => setIsOpen(false)

        const courseId = params.courseId  
        // const { coursename, userId } = location.state

        // fetch course with courseId from backend
        useEffect(() => {
            loadSingleCourse(courseId).then((res) => {
                setCourse(res)
                setLoading(false)
            }).catch((e) => console.log(e))
        }, [])

    // const course = {
    //     id: 1,
    //     author: 'User 1',
    //     title: 'Sorting',
    //     icon: '',
    //     description: 'This is course description',
    //     subsections: [
    //     {
    //         id: 1,
    //         name: 'Week 1',
    //         lecture: [
    //         {
    //             id: 1,
    //             title: 'Lecture 1',
    //             body: 'Body of lecture 1',
    //             live: true,
    //         },
    //         {
    //             id: 2,
    //             title: 'Lecture 2',
    //             body: 'Body of lecture 2',
    //             live: true,
    //         },
    //         ],
    //         quiz: {
    //         id: 1,
    //         questions: [
    //             {
    //             id: 1,
    //             question: 'string',
    //             options: ['string'],
    //             },
    //         ],
    //         },
    //     },
    //     {
    //         id: 2,
    //         name: 'Week 2',
    //         lecture: [
    //         {
    //             id: 3,
    //             title: 'Lecture 1',
    //             body: 'Body of lecture 1',
    //             live: true,
    //         },
    //         {
    //             id: 4,
    //             title: 'Lecture 2',
    //             body: 'Body of lecture 2',
    //             live: true,
    //         },
    //         ],
    //     },
    //     {
    //         id: 3,
    //         name: 'Week 3',
    //         lecture: [
    //         {
    //             id: 5,
    //             title: 'Lecture 5',
    //             body: 'Body of lecture 5',
    //             live: true,
    //         },
    //         {
    //             id: 6,
    //             title: 'Lecture 6',
    //             body: 'Body of lecture 6',
    //             live: true,
    //         },
    //         ],
    //     },
    //     ],
    //     live: true,
    //     premium: true,
    // }

    const handleEditInfo = () => {
        navigate('/create/course', {
            state: {
                courseName: course.title,
                desc: course.description,
                img: course.icon
            }
        })
    }

    const handleSubsectionCreate = () => {
        if (subsection === '') {
            alert('Subsection name cannot be empty')
            return
        }

        setSubsectionLoading(true)
        createSubsection(courseId, subsection).then((res) => {
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

        // course.subsections.push({
        //     id: course.subsections.length + 1,
        //     name: subsection,
        //     lecture: [],
        //     quiz: {
        //         id: course.subsections.length + 1,
        //         questions: []
        //     }
        // })
    }

    return (
        <Container sx={styleContainer} className="course-info">
            {loading ? <CircularProgress /> : 
            <>
            <img src={course.icon} alt={course.title} className="course-image" />
            <div style={styleTitleDiv}>
                <h1 className="course-title">{course.title}</h1>
                <div className="info">
                    <span>Created by: {course.author}</span>
                    <Chip className="chip" label="Edit Info" onClick={handleEditInfo} />
                </div>
            </div>
            <p className="course-description">{course.description}</p>
            <Divider variant="middle" color="pink" />
            <Subsection course={course} />
            <Button variant="contained" color="secondary" onClick={handleOpen}>
                Add Subsection
            </Button>
            <Modal
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styleModal}>
                  <h1 id="subsection-modal-title">Create Subsection</h1>
                  <input className='subsection-modal-input' type='text' value={subsection} placeholder='Subsection Name' onChange={(e) => setSubsection(e.target.value)} required/>
                  <button className='subsection-modal-button' onClick={handleSubsectionCreate}>Create</button>
                  {subsectionLoading && <CircularProgress style={{ color: 'pink', }} />}
                </Box>
            </Modal>
        </>}
        </Container>
    )
}

export default ShowCourse