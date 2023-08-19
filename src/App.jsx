import { Routes, Route } from 'react-router-dom'

import Home from './components/Home'
import Course from './components/Course'
import AddCourseInfo from './components/AddCourseInfo'
import UserCourses from './components/UserCourses'
import AddCourseContent from './components/AddCourseContent'
import CreateCourse from './components/CreateCourse'
import ShowLecture from './components/ShowLecture'
import Navbar from './components/Navbar'
import Progress from './components/Progress'
import ShowCourse from './components/Course/ShowCourse'
import AddCourseQuiz from './components/Content/Quiz/AddCourseQuiz'
import QuizView from './components/Content/Quiz/QuizView'
import Discussion from './components/Discussion/Discussion'
import Post from './components/Discussion/Post'
import { PostProvider } from './contexts/PostContext'
import CreatePost from './components/Discussion/CreatePost'
import Register from './components/Auth/Register'
import Login from './components/Auth/Login'
import Test from './components/Test'

import useToken from './hooks/useToken'

import './App.css'

const App = () => {
  const { token, setToken } = useToken()

  const clearToken = () => {
    setToken('')
    localStorage.setItem('codelytic-user', null)
  }

  return (
    <>
      <Navbar token={token} handleLogout={clearToken} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="courses" element={<Course />} />
        <Route path="create/course" element={<AddCourseInfo token={token} />} />
        <Route path="user" element={<UserCourses token={token} />} />
        <Route path="create/course-content" element={<AddCourseContent token={token} />} />
        <Route path="create/course-quiz" element={<AddCourseQuiz token={token} />} />
        <Route path="progress" element={<Progress token={token} />} />
        <Route path="course/:courseId" exact element={<ShowCourse token={token} />} />
        <Route path="course/:courseId/subsection/:subId" element={<ShowLecture />} />
        <Route path="quiz/:quizId" element={<QuizView token={token} />} />
        <Route path="discussion" element={<Discussion />} />
        <Route path="posts/:id" element={<PostProvider><Post token={token} /></PostProvider>} />
        <Route path="discussion/create" element={<CreatePost token={token} />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login setToken={setToken} />} />

        <Route path="test" element={<Test token={token} />} />
      </Routes>
    </>
  )
}

export default App
