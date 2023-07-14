import { useContext } from "react"
import { Button, TextField } from "@mui/material"

import { multiStepContext } from "../StepContext"

const AddCourseQuiz = () => {
    const { setCurrentStep, userData, setUserData, submitData } = useContext(multiStepContext)

    return (
    <div>
        <div>
            <TextField
                label="Quiz 1"
                margin="normal"
                variant="outlined"
                color="secondary"
            />
        </div>
        <div>
            <TextField
                label="Quiz 2"
                margin="normal"
                variant="outlined"
                color="secondary"
            />
        </div>
        <div>
            <Button variant="contained" color="secondary" onClick={() => setCurrentStep(2)}>
                Back
            </Button>
            <span> </span>
            <Button variant="contained" color="primary" onClick={submitData}>
                Submit
            </Button>
        </div>
    </div>
    )
}

export default AddCourseQuiz
