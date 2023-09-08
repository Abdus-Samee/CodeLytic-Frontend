import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { CircularProgress } from "@mui/material"
import { ResponsiveCalendar } from "@nivo/calendar"

import transition from "../../transition"
import { loadAllCourses } from "../../services/course-service"
import { getProgressPercentage } from "../../services/user-service"

import "../../assets/css/progress.css"

const Progress = ({ token }) => {
    const [ongoingCourses, setOngoingCourses] = useState([])
    const [percent, setPercent] = useState({})
    const [width, setWidth] = useState(0)
    const [clickedCourse, setClickedCourse] = useState(0)
    const [loading, setLoading] = useState(true)
    const carousel = useRef()

    const navigate = useNavigate()

    const data = [
        {
            "value": 9,
            "day": "2023-06-18"
          },
          {
            "value": 7,
            "day": "2023-11-03"
          },
          {
            "value": 24,
            "day": "2023-07-13"
          },
          {
            "value": 21,
            "day": "2023-03-18"
          },
          {
            "value": 11,
            "day": "2023-08-18"
          },
          {
            "value": 4,
            "day": "2023-09-05"
          },
          {
            "value": 3,
            "day": "2023-10-17"
          },
    ]

    // const ongoingCourses = [
    //     {
    //       id: '1',
    //       title: 'Basic Graph Theory',
    //       body: 'Learn the basics of graph theory',
    //       author: 'John Doe',
    //     },
    //     {
    //       id: '2',
    //       title: 'Dynamic Programming',
    //       body: 'Learn the basics of dynamic programming',
    //       author: 'John Doe',
    //     },
    //     {
    //       id: '3',
    //       title: 'Number Theory',
    //       body: 'Learn the basics of number theory',
    //       author: 'Rick & Morty',
    //     },
    //     {
    //       id: '4',
    //       title: 'String Algorithms',
    //       body: 'Learn the basics of string algorithms',
    //       author: 'Trudy',
    //     },
    //     {
    //       id: '5',
    //       title: 'Discrete Mathematics',
    //       body: 'Learn the basics of discrete mathematics',
    //       author: 'Eve',
    //     },
    // ]

    const ticks = ["Loss", 0, 5, 10, 15]

    const colors = [
        "#333440",
        "#333440",
        "#0E4429",
        "#006D32",
        "#26A641",
        "#39D353",
    ]

    const colorScaleFn = (value) => {
      if (value < 0 || value === "Loss") {
          return colors[0]
      }

      if (value == 0) {
          return colors[1]
      }
      
      for (let i = 2; i < ticks.length; i++) {
          if (value < ticks[i]) {
          return colors[i]
          }
      }

      return colors[colors.length - 1]
    }

    colorScaleFn.ticks = () => ticks
    
    useEffect(() => {
        if(!token){
            navigate('/login')
        }

        const customHeaders = {
          'Authorization': `Bearer ${token}`,
        }

        const user = JSON.parse(localStorage.getItem('codelytic-user'))
        const { enrolledCourse } = user
        const enrolledCourseIds = enrolledCourse.map(course => course.id)
        loadAllCourses().then((res) => {
            setOngoingCourses(res.filter(course => enrolledCourseIds.includes(course.id)))

            getProgressPercentage(customHeaders).then((res) => {
                console.log(res)
                setPercent(res)
                setLoading(false)
            }).catch(e => console.log(e))

        }).catch(e => console.log(e))

        setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth)
    }, [])

    const getCoursePercent = (cid) => {
        return percent[cid]
    }
    
    const handleCourseClick = (cid) => {
        setClickedCourse(cid)
    }
    

    return (
        <div className="" style={{ height: '100vh', }}>
          <div style={{display:'flex', flexDirection:'row', justifyContent :'space-around'}}>
            <motion.div ref={carousel} className="carousel" whileTap={{ cursor: "grabbing", }}>
              <h3 className="ongoing-carousel-header">Ongoing Courses</h3>
               {loading ? <CircularProgress style={{ color: 'pink', marginLeft: '50%', }} /> :
                <motion.div drag="x" dragConstraints={{ left: -width/2, right: 0, }} className="inner-carousel">
                  {ongoingCourses.map((course, index) => (
                    <motion.div className="item" key={index} onClick={() => handleCourseClick(course.id)}>
                      <article className="ongoing-card">
                        <header className="ongoing-card-header">
                          <h2>{course.title}</h2>
                          <div>
                            {/**<style>{`:root { --progress-percent: 10%; }`}</style>
                  <div className="progress-4"></div>**/}
                            <p>Progess: {getCoursePercent(course.id)}%</p>
                          </div>
                        </header>
                        <div className="ongoing-card-author">
                          <div className="ongoing-author-name">
                            <div className="ongoing-author-name-prefix">Author</div>
                            <p>{course.author}</p>
                          </div>
                        </div>
                      </article>
                    </motion.div>
                  ))}
                </motion.div>
               }
            </motion.div>
            <div style={{ border: "1px solid #fff", padding: "1rem", marginTop:"1vh", display: clickedCourse===0? 'none' : '', }}>
                {
                    clickedCourse === 0 ? <h3 style={{ color: 'white'}}>No course selected</h3> : <h3 style={{ color: 'white'}}>Course {clickedCourse} selected</h3>
                }
            </div>
            </div>
            <div style={{ background: '#26A649', height: '40vh', width: '70vw', margin: '0 auto', marginTop: '1vh' }}>
                <ResponsiveCalendar
                    data={data}
                    from="2023-01-01"
                    to="2023-12-31"
                    emptyColor="#333440"
                    margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
                    yearSpacing={40}
                    monthBorderColor="#17141D"
                    dayBorderWidth={2}
                    dayBorderColor="#17141D"
                    tooltip={({ day, value, color }) => (
                        <strong style={{ color: 'white', }}>
                            {value}: {color}
                        </strong>
                    )}
                    legends={[
                        {
                            anchor: 'bottom-right',
                            direction: 'row',
                            translateY: 36,
                            itemCount: 4,
                            itemWidth: 42,
                            itemHeight: 36,
                            itemsSpacing: 14,
                            itemDirection: 'right-to-left',
                        }
                    ]}
                    colorScale={colorScaleFn}
                />
            </div>
        </div>
    )
}

export default transition(Progress)