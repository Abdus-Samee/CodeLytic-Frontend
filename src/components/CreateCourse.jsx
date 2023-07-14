import { useContext } from "react"
import { Stepper, StepLabel, Step } from "@mui/material"

import AddCourseInfo from "./AddCourseInfo"
import AddCourseContent from "./AddCourseContent"
import AddCourseQuiz from "./AddCourseQuiz"
import { multiStepContext } from "../StepContext"

import "../assets/css/createcourse.css"

const CreateCourse = () => {
    const { currentStep, finalData } = useContext(multiStepContext)

    const showStep = (step) => {
        switch(step){
            case 1:
                return <AddCourseInfo />
            case 2:
                return <AddCourseContent />
            case 3:
                return <AddCourseQuiz />
        }
    }
  
    return (
    <div className="content">
        <h3 style={{ color: 'red', textDecoration: 'underline' }}>Create Course</h3>
        <div className="center-stepper">
            <Stepper style={{ width: '18%', }} activeStep={currentStep-1} orientation="horizontal">
                <Step>
                    <StepLabel></StepLabel>
                </Step>
                <Step>
                    <StepLabel></StepLabel>
                </Step>
                <Step>
                    <StepLabel></StepLabel>
                </Step>
            </Stepper>
        </div>
        { showStep(currentStep) }
    </div>
    )
}

export default CreateCourse
