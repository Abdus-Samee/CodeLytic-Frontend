import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import "../assets/css/course.css";
import { Link, useNavigate } from 'react-router-dom';

const Course = () => {
  const [courses, setCourses] = React.useState([
    { id: 1, name: "Dynamic Programming", quizzes: 3, lectures: 5 },
    { id: 2, name: "Searching", quizzes: 2, lectures: 3 },
    { id: 3, name: "Sorting", quizzes: 4, lectures: 6 }
  ]);

  const navigate = useNavigate();
  

  const handleShowCourse = (courseId) => {
    // Navigate to the ShowCourse route with the appropriate user ID and course ID
    const userId = 1;
    //find the coursename with corresponding courseId
    const course = courses.find(course => course.id === courseId)
    const coursename = course.name
    navigate(`/user/${userId}/showcourse/${courseId}`,{
      state: {
        coursename
    }
  })
}

  return (
    <div>
      <h1>Courses</h1>
      <div className="course-cards">
        {courses.map((course) => (
          <Card className="course-card" key={course.id}>
            <CardContent>
              <Typography variant="h5" component="div">
                {course.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Number of Quizzes: {course.quizzes}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Number of Lectures: {course.lectures}
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => handleShowCourse(course.id)}
              >
                Start Course
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Course;
