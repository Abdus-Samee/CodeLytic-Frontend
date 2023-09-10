import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Accordion from '@mui/material/Accordion'
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import { getCourseProgress } from '../../services/user-service'

import '../../assets/css/subsection.css'

const Subsection = ({ token, course, isEnrolled, isAuthor, isAdmin }) => {
  const [isQuiz, setIsQuiz] = useState(true)
  const [progress, setProgress] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    // console.log('course', course)

    const customHeaders = {
      Authorization: 'Bearer ' + token
    }

    if(isEnrolled){
      getCourseProgress(course.id, customHeaders).then((res) => {
        console.log('Course progress: ', res)

        const { subsectionsProgresses } = res
        if(subsectionsProgresses.length > 0){
          setProgress(subsectionsProgresses)
        }
      }).catch(e => console.log(e))
      setIsQuiz(false)
    }else{
      setIsQuiz(false)
    }
  }, [])

  const handleLectureClick = (sid, lid) => {
    // console.log('selected lec', lid)
    navigate(`/course/lectures/${lid}`, {
      state: {
        cid: course.id,
        sid,
        isAuthor
      }
    })
  }

  const handleAddLecture = (sid) => {
    navigate('/create/course-content', {
      state: {
        cid: course.id,
        sid
      }
    })
  }

  const handleQuizClick = (id, sid) => {
    let found = true

    if(!isEnrolled && !isAdmin){
      alert('You have to enroll to access quiz')
      return
    }

    progress.forEach((o) => {
      if(o.subsectionId === sid){
        const lectures = Object.values(o.lectures)
        lectures.forEach((lec) => {
          if(lec === false){
            found = false
          }
        })
      }
    })

    if(!found && !isAdmin){
      alert('You have to complete all lectures to access quiz')
    }else{
      navigate(`/quiz/${id}`, {
        state: {
          cid: course.id,
          sid
        }
      })
    }
  }

  const handleAddQuiz = (sid) => {
    navigate('/create/course-quiz', {
      state: {
        sid
      }
    })
  }

  const furnishSubsectionName = (name) => {
    if(name.startsWith('"')){
      name = name.slice(1)
    }

    if(name.endsWith('"')){
      name = name.slice(0, -1)
    }

    return name
  }

  return (
    <div className="ag-format-container">
      <div className="ag-courses_box">
        {course.subsections.map((o, k) => (
          <div key={k} className="ag-courses_item">
            <div className="ag-courses-item_link">
              <div className="ag-courses-item_bg"></div>

              <div className="ag-courses-item_title">{furnishSubsectionName(o.name)}</div>

              {o.lectures.count !== 0 && (
                <Accordion className="lecture">
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>Lecture</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {o.lectures.map((i, k) => (
                      <Button key={k} className="show-lec-btn" onClick={() => handleLectureClick(o.id, i.id)}>{i.title}</Button>
                    ))}
                    {isAuthor && <Button onClick={() => handleAddLecture(o.id)}>Add Lecture</Button>}
                  </AccordionDetails>
                </Accordion>
              )}
              <Accordion className="quiz">
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Quiz</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {isQuiz ? <p>Loading quizes</p> : o.quiz ? (
                    <Button variant="outlined" size="small" onClick={() => handleQuizClick(o.quiz.id, o.id)}>
                      Show
                    </Button>
                  ) : (
                    <>
                    {isAuthor && <Button variant="contained" onClick={() => handleAddQuiz(o.id)}>Add Quiz</Button>}
                    </>
                  )}
                </AccordionDetails>
              </Accordion>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Subsection