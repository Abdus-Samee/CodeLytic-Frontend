import { useState, useEffect } from "react"
import { Link, useNavigate } from 'react-router-dom'
import { Card, CardContent, Typography, Button, Container } from "@mui/material"
import LockIcon from '@mui/icons-material/Lock'

import Search from "./Search"

import { loadAllCourses, loadAllTags, loadSingleCourse } from "../services/course-service"

import "../assets/css/course.css"

const Course = () => {
  const [selectedCourse, setSelectedCourse] = useState('')
  const [searchTags, setSearchTags] = useState([])
  const navigate = useNavigate()

  const courses = [
    {
      id: 1,
      date: 'Aug 10, 2023',
      coursename: 'Sorting first',
      author: 'A. Samee',
      img: '',
      premium: false,
      tags: ['sorting', 'dfs', 'bfs', 'graph',],
    },
    {
      id: 2,
      date: 'Aug 10, 2023',
      coursename: 'Number Theory',
      author: 'A. Samee',
      img: '',
      premium: true,
      tags: ['number theory', 'implementation'],
    },
    {
      id: 3,
      date: 'Aug 10, 2023',
      coursename: 'Sorting',
      author: 'A. Samee',
      img: '',
      premium: false,
      tags: ['sorting', 'dfs', 'bfs', 'graph', 'implementation'],
    },
    {
      id: 4,
      date: 'Aug 10, 2023',
      coursename: 'Sorting',
      author: 'A. Samee',
      img: '',
      premium: false,
      tags: ['sorting', 'dfs', 'bfs', 'graph', 'implementation'],
    },
    {
      id: 5,
      date: 'Aug 10, 2023',
      coursename: 'Sorting',
      author: 'A. Samee',
      img: '',
      premium: true,
      tags: ['sorting', 'dfs', 'number theory', 'graph', 'implementation'],
    },
    {
      id: 6,
      date: 'Aug 10, 2023',
      coursename: 'Sorting',
      author: 'A. Samee',
      img: '',
      premium: false,
      tags: ['sorting', 'dfs', 'bfs', 'graph', 'implementation'],
    },
    {
      id: 7,
      date: 'Aug 10, 2023',
      coursename: 'Sorting',
      author: 'A. Samee',
      img: '',
      premium: true,
      tags: ['sorting', 'dfs', 'bfs', 'graph', 'implementation'],
    },
    {
      id: 8,
      date: 'Aug 10, 2023',
      coursename: 'Sorting',
      author: 'A. Samee',
      img: '',
      premium: false,
      tags: ['sorting', 'number theory', 'bfs', 'graph', 'implementation'],
    },
    {
      id: 9,
      date: 'Aug 10, 2023',
      coursename: 'Sorting',
      author: 'A. Samee',
      img: '',
      premium: false,
      tags: ['sorting', 'dfs', 'bfs', 'graph', 'implementation'],
    },
    {
      id: 10,
      date: 'Aug 10, 2023',
      coursename: 'Sorting last',
      author: 'A. Samee',
      img: '',
      premium: true,
      tags: ['sorting', 'dfs', 'bfs', 'graph', 'implementation'],
    },
  ];

  useEffect(() => {
    loadAllCourses().then((res) => {
      console.log(res)
    }).catch((e) => console.log(e))

    loadSingleCourse(3).then((res) => {
      console.log(res)
    }).catch(e => console.log(e))

    loadAllTags().then((res) => {
      console.log(res)
    }).catch(e => console.log(e))

    // fetch("https://b809-103-94-134-4.ngrok-free.app/course/")
    //         .then(response => response.json())
    //         .then(data => console.log(data))
  }, [])

  const handleShowCourse = (courseId,premium) => {
    if (!premium){// Navigate to the ShowCourse route with the appropriate user ID and course ID
      const userId = 1;
      //find the coursename with corresponding courseId
      const course = courses.find(course => course.id === courseId)
      const coursename = course.name
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

  const handleTagRemove = (tagName) => {
    setSearchTags(prevTags => prevTags.filter(tag => tag !== tagName))
  }

  const isSearchEmpty = selectedCourse === '' && searchTags.length === 0

  const filteredCourses = isSearchEmpty
    ? courses
    : courses.filter((course) =>
        (course.coursename.toLowerCase().includes(selectedCourse.toLowerCase()) || selectedCourse === '') &&
        (searchTags.length === 0 || course.tags.some((tag) => searchTags.includes(tag)))
      )

  const handleSearch = (value) => {
    setSelectedCourse(value)
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
      <section className="card-list">
        {filteredCourses.map((obj, idx) => (
          <article key={idx} className="card">
            <header className="card-header">
              <p>{obj.date}</p>
              <h2 onClick={() => handleShowCourse(obj.id, obj.premium)}>{obj.coursename}</h2>
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
              {obj.tags.map((tagName, i) => (
                <a key={i} onClick={() => handleTagClick(tagName)}>
                  {tagName}
                </a>
              ))}
            </div>
          </article>
        ))}
      </section>
    </div>
  )
}

export default Course