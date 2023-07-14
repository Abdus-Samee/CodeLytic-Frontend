import { useContext } from "react"
import { Button, TextField } from "@mui/material"

import { multiStepContext } from "../StepContext"

const AddCourseContent = () => {
    const { setCurrentStep, userData, setUserData } = useContext(multiStepContext)

    return (
        <div>
            <div>
                <TextField
                    label="Course Content"
                    margin="normal"
                    variant="outlined"
                    color="secondary"
                />
            </div>
            <div>
                <Button variant="contained" color="secondary" onClick={() => setCurrentStep(1)}>
                    Back
                </Button>
                <span> </span>
                <Button variant="contained" color="primary" onClick={() => setCurrentStep(3)}>
                    Next
                </Button>
            </div>
        </div>
    )
}

export default AddCourseContent
