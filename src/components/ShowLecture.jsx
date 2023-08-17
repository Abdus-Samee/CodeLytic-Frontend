import React, { useState, useEffect } from 'react'
import { useParams, useLocation, useNavigate } from "react-router-dom"
import { Container, Box, Typography, Button, Stepper, Step, StepButton, Divider, Grid, Card, CardContent, CardActions } from '@mui/material'

const ShowLecture = () => {
  const params = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const courseId = params.courseId
  const subId = params.subId
  const { coursename, step } = location.state
  const [activeStep, setActiveStep] = useState(0)
  const [completed, setCompleted] = useState({})

  useEffect(() => {
    setActiveStep(step)
    // console.log('step:', activeStep)
  }, [])

  const lectures = [
    { title: 'sorting', content: 'Sorting algorithms: mergesort, bubblesort, quicksort etc' },
    { title: 'dfs', content: 'Depth First Search traversal' },
  ]

  const quizzes = [
    { title: 'Quiz 1' },
  ]

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

  const showLecture = (i) => {
    const obj = lectures[i]

    return (
      <div>
        <Typography variant="h5">{obj.title}</Typography>
        <Typography variant="body1">{obj.content}</Typography>
      </div>
    )
  }

  return (
    <div>
      <h1>{coursename} </h1>
      <Container>
        <Box sx={{ width: '100%' }}>
          <Stepper nonLinear activeStep={activeStep}>
            {lectures.map((label, index) => (
              <Step key={index} completed={completed[index]}>
                <StepButton color="inherit" onClick={handleStep(index)}>
                  {label.title}
                </StepButton>
              </Step>
            ))}
          </Stepper>
          <div>
            <React.Fragment>
              <Typography color="primary" variant="h4" sx={{ mt: 2, mb: 1, py: 1 }}>
                Lecture {activeStep + 1}
              </Typography>
              {showLecture(activeStep)}
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button onClick={handleNext} sx={{ mr: 1 }}>
                  Next
                </Button>
                
                <Button onClick={() => navigate('/courses')}>All Courses</Button>
              </Box>
            </React.Fragment>
            <br />
            <br />
          </div>
        </Box>
      </Container>
    </div>
  )
}

export default ShowLecture
