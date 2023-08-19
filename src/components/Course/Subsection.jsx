import { useParams, useLocation, useNavigate } from "react-router-dom"
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import '../../assets/css/subsection.css'

const Subsection = ({ course }) => {
  const navigate = useNavigate()

  const handleLectureClick = (o, i) => {
    console.log('selected lec', i)
    navigate(`/course/${course.id}/subsection/${o}`, {
      state: {
        coursename: course.title,
        step: i,
      },
    })
  }

  const handleAddLecture = () => {
    navigate('/create/course-content')
  }

  const handleQuizClick = () => {
    //get quiz id
    const id = 1

    navigate(`/quiz/${id}`)
  }

  return (
    <div className="ag-format-container">
      <div className="ag-courses_box">
        {course.subsections.map((o, k) => (
          <div key={k} className="ag-courses_item">
            <div className="ag-courses-item_link">
              <div className="ag-courses-item_bg"></div>

              <div className="ag-courses-item_title">{o.name}</div>

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
                      <Accordion key={k}>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <Typography>{i.title}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>{i.body}</Typography>
                          <Button onClick={() => handleLectureClick(o.id, k)}>Show</Button>
                        </AccordionDetails>
                      </Accordion>
                    ))}
                    <Button onClick={handleAddLecture}>Add Lecture</Button>
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
                  {o.quiz ? (
                    <Button variant="outlined" size="small" onClick={() => handleQuizClick()}>
                      Show
                    </Button>
                  ) : (
                    <Button variant="contained">Add Quiz</Button>
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