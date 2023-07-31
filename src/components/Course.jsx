import React, { useState } from "react";
import "../assets/css/course.css";

const Course = () => {
    const [courses, setCourses] = useState([
      { id: 1, name: "Dynamic Programming" },
      { id: 2, name: "Searching" },
      { id: 3, name: "Sorting" }
    ]);
  
    const addCourse = (name) => {
      // Generate a unique ID for the new course
      const newId = Math.max(...courses.map((course) => course.id)) + 1;
      const newCourse = { id: newId, name };
      setCourses((prevCourses) => [...prevCourses, newCourse]);
    };
  
    return (
      <div>
        <h1>Courses</h1>
        <div className="course-cards">
          {courses.map((course) => (
            <div className="course-card" key={course.id}>
              <h2>{course.name}</h2>
              {/* Add more course details or actions here if needed */}
            </div>
          ))}
        </div>
        <AddCourseForm addCourse={addCourse} />
      </div>
    );
  };
  
  const AddCourseForm = ({ addCourse }) => {
    const [courseName, setCourseName] = useState("");
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (courseName.trim() !== "") {
        addCourse(courseName.trim());
        setCourseName("");
      }
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          placeholder="Enter course name"
        />
        <button type="submit">Add Course</button>
      </form>
    );
  };
  
  export default Course;
