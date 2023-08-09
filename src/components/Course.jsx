import { useState, useEffect } from "react"
import { Link, useNavigate } from 'react-router-dom'
import { Card, CardContent, Typography, Button, Container } from "@mui/material"
import LockIcon from '@mui/icons-material/Lock'

import { loadAllCourses } from "../services/course-service"

import "../assets/css/course.css"

const Course = () => {
  const navigate = useNavigate()
  const [courses, setCourses] = useState([
    { id: 1, name: "Dynamic Programming", quizzes: 3, lectures: 5, premium: false },
    { id: 2, name: "Searching", quizzes: 2, lectures: 3, premium: false },
    { id: 3, name: "Sorting", quizzes: 4, lectures: 6, premium: false },
    { id: 4, name: "Graph", quizzes: 4, lectures: 6, premium: true}
  ])

  useEffect(() => {
    loadAllCourses().then((res) => {
      console.log(res)
    }).catch((e) => console.log(e))
  }, [])

  const handleShowCourse = (courseId,premium) => {
    if (!premium)
    {// Navigate to the ShowCourse route with the appropriate user ID and course ID
    const userId = 1;
    //find the coursename with corresponding courseId
    const course = courses.find(course => course.id === courseId)
    const coursename = course.name
    navigate(`/course/${courseId}`,{
      state: {
        coursename,
        userId
    }
  })
}
}

  return (
    <div>
      <h1>Courses</h1>
      <Container>
      <div className="course-cards">
        {courses.map((course) => (
          <Card className="course-card" key={course.id}>
            <CardContent>
              <Typography variant="h5" component="div">
                {course.name}
                {course.premium && <LockIcon />}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Number of Quizzes: {course.quizzes}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Number of Lectures: {course.lectures}
              </Typography>
              {!course.premium && 
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleShowCourse(course.id,course.premium)}
                >
                  Show Course
                </Button>
              }
            </CardContent>
          </Card>
        ))}
      </div>
      </Container>
    </div>
  )
}

export default Course