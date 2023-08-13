import { useState, useEffect } from 'react'
import { useParams, useLocation, useNavigate } from "react-router-dom"

import "../../assets/css/showcourse.css"

const ShowCourse = () => {
    const params = useParams()
    const location = useLocation()
    const navigate = useNavigate()
    
    const courseId = params.courseId  
    const { coursename, userId } = location.state

    // fetch course with courseId from backend

    const course = {
        "id": courseId,
        "author": "User 1",
        "title": coursename,
        "icon": "",
        "description": "This is course description",
        "subsections": [
          {
            "id": 1,
            "lecture": [
                {
                    "id": 1,
                    "title": "Lecture 1",
                    "body": "Body of lecture 1",
                    "live": true
                },
                {
                    "id": 2,
                    "title": "Lecture 2",
                    "body": "Body of lecture 2",
                    "live": true
                },
            ],
            "quiz": {
                "id": 1,
                "questions": [
                  {
                    "id": 1,
                    "question": "string",
                    "options": [
                      "string"
                    ]
                  }
                ]
            }
          }
        ],
        "live": true,
        "premium": true
    }

    return (
        <div className='course-info'>
            <img src={course.icon} alt={course.title} />
            <h4>{course.title}</h4>
            <p>{course.description}</p>
        </div>
    )
}

export default ShowCourse