import { useState, useEffect } from 'react'
import { useParams, useLocation, useNavigate } from "react-router-dom"
import { Container, Divider, Button, Chip} from '@mui/material'

import Subsection from './Subsection'

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

    const ShowCourse = () => {
        const params = useParams()
        const location = useLocation()
        const navigate = useNavigate()

        const courseId = params.courseId  
        const { coursename, userId } = location.state

        // fetch course with courseId from backend

    const course = {
        id: 1,
        author: 'User 1',
        title: 'Sorting',
        icon: '',
        description: 'This is course description',
        subsections: [
        {
            id: 1,
            name: 'Week 1',
            lecture: [
            {
                id: 1,
                title: 'Lecture 1',
                body: 'Body of lecture 1',
                live: true,
            },
            {
                id: 2,
                title: 'Lecture 2',
                body: 'Body of lecture 2',
                live: true,
            },
            ],
            quiz: {
            id: 1,
            questions: [
                {
                id: 1,
                question: 'string',
                options: ['string'],
                },
            ],
            },
        },
        {
            id: 2,
            name: 'Week 2',
            lecture: [
            {
                id: 3,
                title: 'Lecture 1',
                body: 'Body of lecture 1',
                live: true,
            },
            {
                id: 4,
                title: 'Lecture 2',
                body: 'Body of lecture 2',
                live: true,
            },
            ],
        },
        {
            id: 3,
            name: 'Week 3',
            lecture: [
            {
                id: 5,
                title: 'Lecture 5',
                body: 'Body of lecture 5',
                live: true,
            },
            {
                id: 6,
                title: 'Lecture 6',
                body: 'Body of lecture 6',
                live: true,
            },
            ],
        },
        ],
        live: true,
        premium: true,
    }

    const handleEditInfo = () => {
        navigate('/create/course', {
            state: {
                courseName: course.title,
                desc: course.description,
                img: course.icon
            }
        })
    }

    return (
        <Container sx={styleContainer} className="course-info">
            <img src={course.icon} alt={course.title} />
            <div style={styleTitleDiv}>
                <h4>{course.title}</h4>
                <div className="info">
                    <span>Created by: {course.author}</span>
                    <Chip className="chip" label="Edit Info" onClick={handleEditInfo} />
                </div>
            </div>
            <p className="course-description">{course.description}</p>
            <Divider variant="middle" color="pink" />
            <Subsection course={course} />
            <Button variant="contained" color="secondary">
                Add Subsection
            </Button>
        </Container>
    )
}

export default ShowCourse