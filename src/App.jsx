import { Routes, Route } from 'react-router-dom'

import Home from './components/Home'
import Course from './components/Course'
import AddCourseInfo from './components/AddCourseInfo'
import UserCourses from './components/UserCourses'
import AddCourseContent from './components/AddCourseContent'
import CreateCourse from './components/CreateCourse'
import Navbar from './components/Navbar'
import Progress from './components/Progress'
import Discussion from './components/Discussion'
import { StepContext } from './StepContext'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="courses" element={<Course />} />
        <Route path="create/course" element={<AddCourseInfo />} />
        <Route path="user/:id/courses" element={<UserCourses />} />
        <Route path="create/course-content" element={<AddCourseContent />} />
        <Route path="progress" element={<Progress />} />
        <Route path="discussion" element={<Discussion />} />
      </Routes>
    </>
  )
}

export default App
