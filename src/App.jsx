import { Routes, Route } from 'react-router-dom'

import Home from './components/Home'
import Course from './components/Course'
import CreateCourse from './components/CreateCourse'
import Navbar from './components/Navbar'
import Progress from './components/Progress'
import Discussion from './components/Discussion'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="courses" element={<Course />} />
        <Route path="create/course" element={<CreateCourse />} />
        <Route path="progress" element={<Progress />} />
        <Route path="discussion" element={<Discussion />} />
      </Routes>
    </>
  )
}

export default App
