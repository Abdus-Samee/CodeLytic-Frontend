import { useState, useEffect } from "react"
import { Link, useNavigate } from 'react-router-dom'
import { CircularProgress, Snackbar } from "@mui/material"
import LockIcon from '@mui/icons-material/Lock'

import Search from "./Search"

import { loadAllCourses, loadAllTags, loadSingleCourse } from "../services/course-service"
import transition from "../transition"

import "../assets/css/course.css"

const Course = () => {
  const [courses, setCourses] = useState([])
  // const [filteredCourses, setFilteredCourses] = useState([])
  const [selectedCourse, setSelectedCourse] = useState('')
  const [searchTags, setSearchTags] = useState([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    const storedUser = localStorage.getItem('codelytic-user')
    if(storedUser){
      const user = JSON.parse(storedUser)
      console.log(user)
    }
    
    loadAllCourses().then((res) => {
      console.log(res)
      const arr = []
      res.map((course) => {
        if(course.live === true){
          arr.push(course)
        }
      })
      setCourses(arr)
      setLoading(false)
    }).catch((e) => console.log(e))
  }, [])

  const handleShowCourse = (courseId,premium) => {
    const user = JSON.parse(localStorage.getItem('codelytic-user'))
    if (!premium || user?.role === "ADMIN"){
      const course = courses.find(course => course.id === courseId)
      const coursename = course.title
      navigate(`/course/${courseId}`)
    }else{
      setOpen(true)
    }
  }

  const handleTagClick = (tagName) => {
    if (!searchTags.includes(tagName)){
      setSearchTags(prevTags => [...prevTags, tagName])
    }
  }

  const updateFilteredCourses = () => {
    const isSearchEmpty = selectedCourse === '' && searchTags.length === 0

    if (isSearchEmpty) {
      setFilteredCourses(courses)
    } else {
      setFilteredCourses(courses.filter((course) =>
        (course.title.toLowerCase().includes(selectedCourse.toLowerCase()) || selectedCourse === '') &&
        (searchTags.length === 0 || course.tags?.some((tag) => searchTags.includes(tag)))
      ))
    }
  }

  const isSearchEmpty = selectedCourse === '' && searchTags.length === 0

  const filteredCourses = isSearchEmpty ? courses : courses.filter((course) =>
    (course.title.toLowerCase().includes(selectedCourse.toLowerCase()) || selectedCourse === '') &&
    (searchTags.length === 0 || course.tags?.some((tag) => searchTags.includes(tag)))
  )

  const handleTagRemove = (tagName) => {
    setSearchTags(prevTags => prevTags.filter(tag => tag !== tagName))
    // updateFilteredCourses()
  }

  const handleSearch = (value) => {
    setSelectedCourse(value)
    // updateFilteredCourses()
  }

  return (
    <div>
      {loading ? <CircularProgress style={{ color: 'pink', marginLeft: '50vw', marginTop: '48vh' }} /> :
      <>
        <Search handleSearch={handleSearch} />
        {searchTags.length > 0 &&
          <div className="searched-tags">
            {searchTags.map((tagName, i) => (
              <a key={i} onClick={() => handleTagRemove(tagName)}>
                {tagName}
              </a>
            ))}
          </div>
        }
        <section className="card-list">
          {filteredCourses?.map((obj, idx) => (
            <article key={idx} className="card">
              <header className="card-header">
                {/**<p>{obj.date}</p>**/}
                <h2 onClick={() => handleShowCourse(obj.id, obj.premium)}>{obj.title}</h2>
              </header>

              <div className="card-author">
                {obj.premium && (
                  <>
                    <div className="author-avatar" style={{ paddingLeft: '.8vw'}}>
                      <LockIcon fontSize="large" />
                    </div>
                    <svg className="half-circle" viewBox="0 0 106 57">
                      <path d="M102 4c0 27.1-21.9 49-49 49S4 31.1 4 4"></path>
                    </svg>
                  </>
                )}

                <div className="author-name">
                  <div className="author-name-prefix">Author</div>
                  {obj.author}
                </div>
              </div>
              <div className="tags">
                {obj?.tags?.map((tagName, i) => (
                  <a key={i} onClick={() => handleTagClick(tagName)}>
                    {tagName}
                  </a>
                ))}
              </div>
            </article>
          ))}
        </section>
      </>
      }
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={open}
        onClose={() => setOpen(false)}
        key="bottomcenter"
      >
        <div style={{ background: '#FF4B2B', padding: '0.5rem 5rem', borderRadius: '10px', }}>
            <span 
                style={{
                    display: 'inline',
                    color: '#000',
                    fontFamily: '"DM Mono", monospace',
                }}>
                    Premium course cannot be accessed
            </span>
        </div>
      </Snackbar>
    </div>
  )
}

export default transition(Course)