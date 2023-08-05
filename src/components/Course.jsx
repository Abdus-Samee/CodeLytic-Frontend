import React, { useState } from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import "../assets/css/course.css";

const Course = () => {
  const [courses, setCourses] = useState([
    { id: 1, name: "Dynamic Programming", quizzes: 3, lectures: 5 },
    { id: 2, name: "Searching", quizzes: 2, lectures: 3 },
    { id: 3, name: "Sorting", quizzes: 4, lectures: 6 }
  ]);

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
              <Button variant="outlined" color="primary">
                Start Course
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Course;
