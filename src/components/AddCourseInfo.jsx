import { useState, useEffect, useContext } from "react"
import { useNavigate, useLocation } from 'react-router-dom'
import { Container, Button, TextField, Autocomplete, Stack } from "@mui/material"
import UploadFileIcon from "@mui/icons-material/UploadFile"

import '../assets/css/courseinfo.css'

const AddCourseInfo = () => {
    // const { setCurrentStep, userData, setUserData } = useContext(multiStepContext)
    const navigate = useNavigate()
    const location = useLocation()
    const [courseName, setCourseName] = useState("")
    const [desc, setDesc] = useState("")
    const [img, setImg] = useState()

    useEffect(() => {
        const { courseName, desc, img } = location.state || {}
        if(courseName && desc){
            setCourseName(courseName)
            setDesc(desc)
        }

        if(img) setImg(img)
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

    const handleImageUpload = (e) => {
        setImg(URL.createObjectURL(e.target.files[0]))
    }

    const handleCreateCourse = () => {
        const userId = 1;

        navigate(`/user/${userId}`, {
            state: {
                courseName,
                desc,
                img
            }
        })
    }

    return (
        <Container className="App">
            <div className="register">
                <div className="col-1">
                    <h2>Course Info</h2>
                    <span>Create a new course</span>

                    <div id='form' className='flex flex-col'>
                        <TextField
                            label="Course Name"
                            margin="normal"
                            variant="outlined"
                            color="secondary"
                            value={courseName}
                            onChange={(e) => setCourseName(e.target.value)}
                        />
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
                        <Button variant="contained" color="primary" onClick={handleCreateCourse}>
                            Create Course
                        </Button>
                    </div>
                </div>
                <div className="flex flex-col col-2">
                    <img src={img} alt="Course Image" />
                    <Button component="label" variant="outlined" startIcon={<UploadFileIcon />} sx={{ marginRight: '1rem' }}>
                        Upload Image
                        <input type="file" accept="image/*" hidden onChange={handleImageUpload} />
                    </Button>
                </div>
            </div>
        </Container>
    )
}

export default AddCourseInfo
