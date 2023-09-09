import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { CircularProgress } from "@mui/material"
import { ResponsiveCalendar } from "@nivo/calendar"
import { Button } from "@mui/material"

import transition from "../../transition"
import { loadAllCourses } from "../../services/course-service"
import { getCourseProgress, getDailyProgress, getProgressPercentage } from "../../services/user-service"

import "../../assets/css/progress.css"

const Progress = ({ token }) => {
    const [data, setData] = useState([])
    const [ongoingCourses, setOngoingCourses] = useState([])
    const [percent, setPercent] = useState({})
    const [width, setWidth] = useState(0)
    const [clickedCourse, setClickedCourse] = useState(0)
    const [loading, setLoading] = useState(true)
    const [loadingCourseProgress, setLoadingCourseProgress] = useState(false)
    const [courseProgress, setCourseProgress] = useState(0)
    const [subsectionProgresses, setSubsectionProgresses] = useState([])
    const carousel = useRef()

    const navigate = useNavigate()

    // const data = [
    //     {
    //         "value": 9,
    //         "day": "2023-06-18"
    //       },
    //       {
    //         "value": 7,
    //         "day": "2023-11-03"
    //       },
    // ]

    const changeDateFormat = (date) => {
      const dateComponents = date.split('-')
      const year = dateComponents[2]
      const month = dateComponents[1]
      const day = dateComponents[0]

      const newDate = `${year}-${month}-${day}`

      return newDate;
    }

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

                getDailyProgress(customHeaders).then((res) => {
                    console.log(res)

                    if(res.length > 0){
                      res.forEach((o) => {
                        const { date, activities } = o
                        const obj = {
                          value: activities.length,
                          day: changeDateFormat(date),
                        }
                        setData(data => [...data, obj])
                      })
                    }

                    setLoading(false)
                }).catch(e => console.log(e))

            }).catch(e => console.log(e))

        }).catch(e => console.log(e))

        setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth)
    }, [])

    const getCoursePercent = (cid) => {
        return percent[cid]
    }
    
    const handleCourseClick = (cid) => {
        setClickedCourse(cid)
        setCourseProgress(getCoursePercent(cid))
        setLoadingCourseProgress(true)

        const customHeaders = {
          'Authorization': `Bearer ${token}`,
        }

        getCourseProgress(cid, customHeaders).then((res) => {
            console.log(res)
            setSubsectionProgresses(res.subsectionsProgresses)
            setLoadingCourseProgress(false)
        }).catch(e => console.log(e))
    }

    const getCompletedLectures = (lectures) => {
        let i = 0
        for(var l in lectures){
          if(lectures[l]) i++
        }

        return i
    }

    const getIncompleteLectures = (lectures) => {
        let i = 0
        for(var l in lectures){
          if(!lectures[l]) i++
        }

        return i
    }

    const renderLectureLinks = (lectures) => {
      return (
        <div>
          {
            Object.keys(lectures).map((l, i) => (
              <a 
                key={i} 
                onClick={() => navigate(`/course/lectures/${l}`)} 
                style={{ 
                  color: lectures[l] === true? 'green' : 'red',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  marginRight: '10px',
                  marginBottom: '10px',
                  transition: 'color 0.3s',
                }}
                onMouseEnter={(e) => e.target.style.color = '#17141D'}
                onMouseLeave={(e) => e.target.style.color = lectures[l] === 1 ? 'green' : 'red'}
              >
                Lecture: {i+1}
              </a>
            ))
          }
        </div>
      )
    }

    const handleVisitSubsectionClick = () => {
      return () => {
        navigate(`/course/${clickedCourse}`)
      }
    }

    const renderQuizProgress = (questions) => {
      var unattempted = 0
      var score = 0
      var total = 0

      for(var q in questions){
        if(questions[q] === 1) score++
        else if(questions[q] === -1) unattempted++
        total++
      }

      if(unattempted === total) return "Not attempted"
      else return `${score}/${total}`
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
                            <p>Progess: {(Math.round(getCoursePercent(course.id)*100)/100).toFixed(2)}%</p>
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
            <div style={{ border: "1px solid #fff", padding: "1rem", marginTop:"1vh", minWidth: '30%', display: clickedCourse===0? 'none' : '', }}>
                {
                    clickedCourse === 0 ? <h3 style={{ color: 'white', fontFamily: 'DM Mono, monospace', }}>No course selected</h3> : 
                    <>
                      {/**<h3 style={{ color: 'white'}}>Course {clickedCourse} selected</h3>**/}
                      {loadingCourseProgress ? <CircularProgress style={{ color: 'pink', marginLeft: '48%', marginTop: '20%', }} /> 
                        : 
                        <div >
                          <h4 style={{ color: 'white', fontFamily: 'DM Mono, monospace', }}>Course Progress: {courseProgress.toFixed(2)}%</h4>
                          <br />
                          <div className="cp-row">
                            <div className="cp-col">
                              <h4>Subsection Progresses:</h4>
                              <div className="cp-tabs">
                                {subsectionProgresses.map((subsection, index) => (
                                  <div className="cp-tab" key={index}>
                                    <input className="cp-input" type="checkbox" id={"chck"+index} />
                                    <label class="cp-tab-label" for={"chck"+index}>{subsection.name}</label>
                                    <div className="cp-tab-content">
                                      <p>Completed Lectures: {getCompletedLectures(subsection.lectures)}</p>
                                      <p>Incomplete Lectures: {getIncompleteLectures(subsection.lectures)}</p>
                                      {subsection.quizProgress.quizId === null ? 
                                        <p style={{ color: 'red', marginTop: '5px', }}>No quiz to attempt!</p>
                                        :
                                        <p>Quiz Progress: {renderQuizProgress(subsection.quizProgress.questions)} ({subsection.quizProgress.quizProgressInPercentage*100}%)</p>
                                      }
                                      <br />
                                      <div style={{ padding: '0.6rem', border: '1px solid #17141D', }}>
                                        {renderLectureLinks(subsection.lectures)}
                                        <Button variant="contained" onClick={handleVisitSubsectionClick()}>Visit subsection</Button>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      }
                    </>
                }
            </div>
            </div>
            <div style={{ borderRadius: '16px', background: 'linear-gradient(90deg, rgba(236,232,240,1) 14%, rgba(230,224,216,1) 54%, rgba(223,200,228,1) 100%)', height: '40vh', width: '70vw', margin: '0 auto', marginTop: '1vh' }}>
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
                            Total Activities: {value}
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