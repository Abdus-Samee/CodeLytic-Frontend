import React, { useState } from "react";
import { Card, CardContent, Typography, TextField, Button } from "@mui/material";
import "../assets/css/course.css";

const Course = () => {
  const [courses, setCourses] = useState([
    { id: 1, name: "Dynamic Programming" },
    { id: 2, name: "Searching" },
    { id: 3, name: "Sorting" }
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
              {/* Add more course details or actions here if needed */}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Course;
