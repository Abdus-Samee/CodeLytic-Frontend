import { useState, useEffect, useContext } from "react"
import { Button, TextField } from "@mui/material"

import { multiStepContext } from "../StepContext"

import "../assets/css/coursecontent.css"

const AddCourseContent = () => {
    const [items, setItems] = useState([])
    const { setCurrentStep, userData, setUserData } = useContext(multiStepContext)

    useEffect(() => {
        console.log(items)
    }, [items])

    const handleDragStart = (event, type) => {

    }
      
    const allowDrop = (event) => {
        event.preventDefault()
    }
      
    const handleDrop = (event) => {
        event.preventDefault();

        const newItem = "text"
        setItems((prevItems) => [...prevItems, newItem])
    }

    return (
        <div>
            <div className="course-container" onDrop={handleDrop} onDragOver={allowDrop}>
                {items.map((item, key) => (
                    <div className="course-item" key={key}>
                        {item === "text" && <div><TextField margin="normal" variant="outlined" color="secondary" /></div>}
                    </div>
                ))}
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
            <div className="content-panel">
                <h3>Add Content</h3>
                <div className="content-item" draggable="true" onDragStart={handleDragStart}>
                    Text Box
                </div>
            </div>
        </div>
    )
}

export default AddCourseContent
