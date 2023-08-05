import React from 'react';
import { useParams, useLocation, useNavigate } from "react-router-dom"

const ShowCourse = ({ match }) => {
  const params = useParams()
  const location = useLocation()
  const navigate = useNavigate()

  const courseId = params.courseId; // Extract course ID from the route parameter
  
  // Here you can fetch the lectures and quizzes for the specified course using the courseId
  const { coursename } = location.state
  return (
    <div>
      <h1>Course {courseId} </h1>
      <div className="course-cards">
        <div className="course-card">
          <h2>{coursename}</h2>
        </div>
      </div>
    </div>
  );
};

export default ShowCourse;
