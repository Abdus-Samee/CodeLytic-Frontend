import { Routes, Route } from 'react-router-dom'

import Home from './components/Home'
import Course from './components/Course'
import AddCourseInfo from './components/AddCourseInfo'
import UserCourses from './components/UserCourses'
import AddCourseContent from './components/AddCourseContent'
import CreateCourse from './components/CreateCourse'
import Navbar from './components/Navbar'
import Progress from './components/Progress'
import ShowCourse from './components/ShowCourse'
import AddCourseQuiz from './components/Content/Quiz/AddCourseQuiz'
import Discussion from './components/Discussion/Discussion'
import Post from './components/Discussion/Post'
import { PostProvider } from './contexts/PostContext'

import './App.css'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="courses" element={<Course />} />
        <Route path="create/course" element={<AddCourseInfo />} />
        <Route path="user/:id/" element={<UserCourses />} />
        <Route path="create/course-content" element={<AddCourseContent />} />
        <Route path="create/course-quiz" element={<AddCourseQuiz />} />
        <Route path="progress" element={<Progress />} />
        <Route path="course/:courseId" element={<ShowCourse />} />
        <Route path="discussion" element={<Discussion />} />
        <Route path="posts/:id" element={<PostProvider><Post /></PostProvider>} />
      </Routes>
    </>
  )
}

export default App
