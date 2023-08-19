import React, { useState, useEffect } from 'react'
import { useParams, useLocation, useNavigate } from "react-router-dom"
import { Container, Box, Typography, Button, StepButton, Divider, CircularProgress } from '@mui/material'

import LectureContent from './Content/Lecture/LectureContent'

import { loadSingleLecture } from '../services/course-service'

const ShowLecture = () => {
  const [completed, setCompleted] = useState({})
  const [activeStep, setActiveStep] = useState(0)
  const [lecture, setLecture] = useState({})
  const [loading, setLoading] = useState(true)

  const params = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const courseId = params.courseId
  const subId = params.subId
  const { coursename, step } = location.state

  useEffect(() => {
    loadSingleLecture(subId).then((res) => {
      console.log('Lecture: ', res)
      setLecture(res)
      setLoading(false)
    }).catch((err) => console.log(err))
  }, [])

  // const lectures = [
  //   { title: 'sorting', content: 'Sorting algorithms: mergesort, bubblesort, quicksort etc' },
  //   { title: 'dfs', content: 'Depth First Search traversal' },
  // ]

  // const quizzes = [
  //   { title: 'Quiz 1' },
  // ]

  const totalSteps = () => {
    return lectures.length
  }

  const completedSteps = () => {
    return Object.keys(completed).length
  }

  const isLastStep = () => {
    return activeStep === totalSteps() - 1
  }

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps()
  }

  const handleNext = () => {
    let newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          lectures.findIndex((step, i) => !(i in completed))
        : activeStep + 1
      
    if(newActiveStep >= totalSteps()) newActiveStep = 0

    setActiveStep(newActiveStep)
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  };

  const handleStep = (step) => () => {
    setActiveStep(step)
  };

  const handleComplete = () => {
    const newCompleted = completed
    newCompleted[activeStep] = true
    setCompleted(newCompleted)
    handleNext()
  };

  const handleReset = () => {
    setActiveStep(0)
    setCompleted({})
  }

  return (
    <Container>
      <h1>{coursename} </h1>
      {loading ? <CircularProgress /> : 
        <Box sx={{ width: '100%' }}>
          <div>
            <Typography color="primary" variant="h4" sx={{ mt: 2, mb: 1, py: 1 }}>
              {lecture.title}
            </Typography>
            <LectureContent content={lecture.body} />
            <Button onClick={() => navigate(-1)}>Back</Button>
          </div>
        </Box>
      }
    </Container>
  )
}

export default ShowLecture
