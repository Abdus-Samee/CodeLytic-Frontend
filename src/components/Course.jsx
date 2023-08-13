import { useState, useEffect } from "react"
import { Link, useNavigate } from 'react-router-dom'
import { Card, CardContent, Typography, Button, Container } from "@mui/material"
import LockIcon from '@mui/icons-material/Lock'

import Search from "./Search"

import { loadAllCourses } from "../services/course-service"

import "../assets/css/course.css"

const Course = () => {
  const navigate = useNavigate()

  const courses = [
    {
      id: 1,
      date: 'Aug 10, 2023',
      coursename: 'Sorting first',
      author: 'A. Samee',
      img: '',
      premium: false,
      tags: ['sorting', 'dfs', 'bfs', 'graph', 'implementation'],
    },
    {
      id: 2,
      date: 'Aug 10, 2023',
      coursename: 'Sorting',
      author: 'A. Samee',
      img: '',
      premium: true,
      tags: ['sorting', 'dfs', 'bfs', 'graph', 'implementation'],
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
      tags: ['sorting', 'dfs', 'bfs', 'graph', 'implementation'],
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
      tags: ['sorting', 'dfs', 'bfs', 'graph', 'implementation'],
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
    // loadAllCourses().then((res) => {
    //   console.log(res)
    // }).catch((e) => console.log(e))
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

  return (
    <div>
    <Search />
    <section className="card-list">
        {courses.map((obj, idx) => (
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
              {obj.tags.map((k, i) => (
                <a key={i} href="#">
                  {k}
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