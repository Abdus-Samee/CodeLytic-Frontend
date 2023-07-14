import { useContext } from "react"
import { Button, TextField } from "@mui/material"

import { multiStepContext } from "../StepContext"

const AddCourseInfo = () => {
    const { setCurrentStep, userData, setUserData } = useContext(multiStepContext)

    return (
    <div>
        <div>
            <TextField
                label="Course Name"
                margin="normal"
                variant="outlined"
                color="secondary"
                value={userData['courseName']}
                onChange={(e) => setUserData({...userData, "courseName": e.target.value})}
            />
        </div>
        <div>
            <TextField
                label="Course Description"
                margin="normal"
                variant="outlined"
                color="secondary"
                value={userData['courseDescription']}
                onChange={(e) => setUserData({...userData, "courseDescription": e.target.value})}
            />
        </div>
        <div>
            <TextField
                label="Course Topic"
                margin="normal"
                variant="outlined"
                color="secondary"
                value={userData['courseTopic']}
                onChange={(e) => setUserData({...userData, "courseTopic": e.target.value})}
            />
        </div>
        <div>
            <Button variant="contained" color="primary" onClick={() => setCurrentStep(2)}>
                Next
            </Button>
        </div>
    </div>
    )
}

export default AddCourseInfo
