import { useState, useEffect, useContext } from "react"
import { useNavigate, useLocation } from 'react-router-dom'
import { Container, Button, TextField, Autocomplete, CircularProgress } from "@mui/material"
import UploadFileIcon from "@mui/icons-material/UploadFile"
import { storage } from "../services/firebase"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { v4 } from "uuid"

import { loadAllTags, createCourse } from "../services/course-service"

import '../assets/css/courseinfo.css'

const AddCourseInfo = ({ token }) => {
    // const { setCurrentStep, userData, setUserData } = useContext(multiStepContext)
    const navigate = useNavigate()
    const location = useLocation()
    const [courseName, setCourseName] = useState("")
    const [desc, setDesc] = useState("")
    const [tags, setTags] = useState([])
    const [selectedTags, setSelectedTags] = useState([])
    const [selectedTagIds, setSelectedTagIds] = useState([])
    const [img, setImg] = useState(null) //for display
    const [file, setFile] = useState(null) //for upload to firebase
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if(!token){
            navigate('/login')
        }

        const customHeaders = {
            Authorization: 'Bearer ' + token,
        }
        console.log(customHeaders);
        const { courseName, desc, img, selectTags } = location.state || {}

        loadAllTags(customHeaders).then((res) => {
            setTags(res)
            //take tag ids having name in selectTags
            const selected = res.filter(tag => {
                if(selectTags.includes(tag.name)){
                    return tag.id
                }
            })
            // console.log('selected: ', selected)
            const gg = selected.map(tag => tag.id)
            const mb = selected.map(tag => tag.name)
            console.log('selectedTagIds: ', mb)
            setSelectedTagIds(gg)
            setSelectedTags(mb)
        }).catch(e => console.log(e))

        if(courseName && desc){
            setCourseName(courseName)
            setDesc(desc)
        }

        if(img) setImg(img)
    }, [])

    const handleTagChange = (event, value) => {
        setSelectedTags(value)
        setSelectedTagIds(value.map(tag => tag.id))
    }

    const handleImageUpload = (e) => {
        setImg(URL.createObjectURL(e.target.files[0]))
        setFile(e.target.files[0])
    }

    const uploadImageToFirebase = () => {
        
    }

    const handleCreateCourse = () => {
        const author = localStorage.getItem('codelytic-user');

        if(!courseName || !desc || !selectedTagIds.length){
            alert('Please fill all the fields')
            return
        }

        if(file){
            const imageRef = ref(storage, `courses/${file.name}-${v4()}`)
            setLoading(true)
            uploadBytes(imageRef, file).then(() => {
                getDownloadURL(imageRef).then((url) => {
                    setLoading(false)
                    
                    const createdCourse = {
                        author: author,
                        title: courseName,
                        icon: url,
                        description: desc,
                        tagIds: selectedTagIds,
                    }

                    console.log('Create course: before api', createdCourse)

                    callCreateCourse(createdCourse)
                })
            })
        }else{
            const createdCourse = {
                author: author,
                title: courseName,
                icon: '',
                description: desc,
                tagIds: selectedTagIds,
            }

            console.log('Create course: before api', createdCourse)

            callCreateCourse(createdCourse)
        }
    }

    const callCreateCourse = (createdCourse) => {
        const customHeaders = {
            Authorization: 'Bearer ' + token,
        }

        createCourse(createdCourse, customHeaders).then((res) => {
            console.log('Create course: ', res)
            navigate('/user')
        }).catch(e => console.log('Create course ', e))
    }

    const textFieldInputLabelProps = {
        style: { color: '#f0e69b'},
        shrink: true,
    }

    const textFieldInputProps = {
        style: { color: '#ffffff', background: '#333440'},
    }

    const textFieldSx = {
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {"& >fieldset": {border: '1px #fbbf77'}}
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
                            InputLabelProps={textFieldInputLabelProps}
                            inputProps={textFieldInputProps}
                            margin="normal"
                            size="small"
                            variant="standard"
                            color="secondary"
                            value={courseName}
                            onChange={(e) => setCourseName(e.target.value)}
                        />
                        <TextField
                            label="Course Description"
                            InputLabelProps={textFieldInputLabelProps}
                            inputProps={textFieldInputProps}
                            multiline
                            rows={10}
                            fullWidth
                            margin="normal"
                            variant="standard"
                            color="secondary"
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                        />
                        <Autocomplete
                            multiple
                            id="tags-outlined"
                            options={tags}
                            getOptionLabel={(option) => option.name}
                            filterSelectedOptions
                            value={selectedTags}
                            onChange={handleTagChange}
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
                    {loading && <CircularProgress style={{ margin: '0 auto', color: 'pink', }} />}
                </div>
            </div>
        </Container>
    )
}

export default AddCourseInfo
