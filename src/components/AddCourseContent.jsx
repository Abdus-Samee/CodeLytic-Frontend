import { useState, useEffect, useContext } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Button, TextField } from "@mui/material"

// import { multiStepContext } from "../StepContext"
import ImageContainer from "./ImageContainer"

import "../assets/css/coursecontent.css"

const AddCourseContent = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [items, setItems] = useState([])
    // const { setCurrentStep, userData, setUserData } = useContext(multiStepContext)

    const contentItems = [
        'Text Box', 'Image', 'Link', 'List'
    ]

    useEffect(() => {
        // const userDataItems = (userData['items'] === undefined)? [] : userData['items']
        const { propItems } = location.state || {}
        if(propItems) setItems(propItems)
    }, [])

    const handleDragStart = (event, type) => {
        event.dataTransfer.setData('type', type)
    }
      
    const allowDrop = (event) => {
        event.preventDefault()
    }
      
    const handleDrop = (event) => {
        event.preventDefault()

        const type = event.dataTransfer.getData('type')
        let key = ""
        let val = ""
        if(type === 'Text Box'){
            key = "text"
            val = ""
        }
        else if(type === "Image"){
            key = "img"
            val = null
        }
        else if(type === "Link") key = "a"
        else if(type === "List") key = "ul"

        const p = items
        p.push({[key]:val})
        setItems(p)
        // setUserData({...userData, "items": items})
        // console.log('data:', userData['items'])
        console.log('items:', items)
    }

    const handleContentChange = (val, i) => {
        const res = items.map((obj, idx) => {
            if(i === idx){
                if(obj.hasOwnProperty("text")) obj.text = val
            }

            return obj
        })

        setItems(res)
        // setUserData({...userData, "items": res})
    }

    const handleImageAddition = (i, imageFile) => {
        console.log("img addition: ", i)
        const res = items.map((obj, idx) => {
            if(i === idx){
                if(obj.hasOwnProperty("img")) obj.img = imageFile
            }

            return obj
        })

        setItems(res)
        // setUserData({...userData, "items": res})
        console.log(items)
    }

    const handleSubmitLecture = () => {
        console.log("Lecture Content: ", items)

        const userId = 1;

        // navigate(`/user/${userId}/courses`, {
        //     state: {
        //         courseName,
        //         desc
        //     }
        // })

        // update subsection data `items` to database
        // navigate to user courses
    }

    return (
        <div>
            <div className="box">
                <div className="course-container" onDrop={handleDrop} onDragOver={allowDrop}>
                    {items.map((obj, idx) => (
                        <div className="course-item" key={idx}>
                            {obj.hasOwnProperty("text") && <div><TextField fullWidth margin="normal" value={obj.text} onChange={(e) => handleContentChange(e.target.value, idx)} variant="outlined" color="secondary" /></div>}
                            {obj.hasOwnProperty("img") && <div><ImageContainer src={obj.img} idx={idx} handleImageAddition={handleImageAddition} /></div>}
                        </div>
                    ))}
                </div>
                <div className="content-panel">
                    <h3>Add Content</h3>
                    {contentItems.map((item, key) => (
                        <div key={key} className="content-item" draggable="true" onDragStart={(e) => handleDragStart(e, item)}>
                            {item}
                        </div>
                    ))}
                </div>
                </div>
            <div className="btn-submit">
                <Button variant="contained" color="primary" onClick={() => setCurrentStep(3)}>
                    Submit Lecture
                </Button>
            </div>
        </div>
    )
}

export default AddCourseContent
