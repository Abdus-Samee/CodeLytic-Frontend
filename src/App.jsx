import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import CreateCourse from './components/CreateCourse'
import Navbar from './components/Navbar'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="create/course" element={<CreateCourse />} />
      </Routes>
    </>
  )
}

export default App
