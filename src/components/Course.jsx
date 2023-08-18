import { useState, useEffect } from "react"
import { Link, useNavigate } from 'react-router-dom'
import { CircularProgress } from "@mui/material"
import LockIcon from '@mui/icons-material/Lock'

import Search from "./Search"

import { loadAllCourses, loadAllTags, loadSingleCourse } from "../services/course-service"

import "../assets/css/course.css"

const Course = () => {
  const [courses, setCourses] = useState([])
  // const [filteredCourses, setFilteredCourses] = useState([])
  const [selectedCourse, setSelectedCourse] = useState('')
  const [searchTags, setSearchTags] = useState([])
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    loadAllCourses().then((res) => {
      setCourses(res)
      // setFilteredCourses(res)
      setLoading(false)
    }).catch((e) => console.log(e))
  }, [])

  const handleShowCourse = (courseId,premium) => {
    if (!premium){// Navigate to the ShowCourse route with the appropriate user ID and course ID
      const userId = 1;
      //find the coursename with corresponding courseId
      const course = courses.find(course => course.id === courseId)
      const coursename = course.title
      navigate(`/course/${courseId}`,{
        state: {
          coursename,
          userId
        } 
      })
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
      {loading ? <CircularProgress style={{ color: 'pink', marginLeft: '48%', }} /> :
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
      }
    </div>
  )
}

export default Course