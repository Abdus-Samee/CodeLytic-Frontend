import { useState, useEffect, useContext } from "react"
import { useNavigate, useLocation } from 'react-router-dom'
import { Button, TextField, Autocomplete, Stack } from "@mui/material"

// import { multiStepContext } from "../StepContext"

const AddCourseInfo = () => {
    // const { setCurrentStep, userData, setUserData } = useContext(multiStepContext)
    const navigate = useNavigate()
    const location = useLocation()
    const [courseName, setCourseName] = useState("")
    const [desc, setDesc] = useState("")

    useEffect(() => {
        const { courseName, desc } = location.state || {}
        if(courseName && desc){
            setCourseName(courseName)
            setDesc(desc)
        }
    }, [])

    const tags = [
        { label: 'sorting' },
        { label: 'graph' },
        { label: 'dfs' },
        { label: 'bfs' },
        { label: 'searching' },
        { label: 'dp' },
        { label: 'recursion' },
    ]

    const handleCreateCourse = () => {
        const userId = 1;

        navigate(`/user/${userId}/courses`, {
            state: {
                courseName,
                desc
            }
        })
    }

    return (
        <Stack spacing={3} sx={{ width: 500 }} style={{ marginLeft: '35%'}}>
            <div>
                <TextField
                    label="Course Name"
                    margin="normal"
                    variant="outlined"
                    color="secondary"
                    value={courseName}
                    onChange={(e) => setCourseName(e.target.value)}
                />
            </div>
            <div>
                <TextField
                    label="Course Description"
                    multiline
                    rows={10}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    color="secondary"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                />
            </div>
            <div>
                <Autocomplete
                    multiple
                    id="tags-outlined"
                    options={tags}
                    getOptionLabel={(option) => option.label}
                    filterSelectedOptions
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            placeholder="Add tags"
                        />
                    )}
                />
            </div>
            <div>
                <Button variant="contained" color="primary" onClick={handleCreateCourse}>
                    Create Course
                </Button>
            </div>
        </Stack>
    )
}

export default AddCourseInfo
