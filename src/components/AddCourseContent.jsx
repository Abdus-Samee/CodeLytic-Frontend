import { useState, useEffect, useContext } from "react"
import { Button, TextField } from "@mui/material"

import { multiStepContext } from "../StepContext"

import "../assets/css/coursecontent.css"

const AddCourseContent = () => {
    const [items, setItems] = useState([])
    const { setCurrentStep, userData, setUserData } = useContext(multiStepContext)

    useEffect(() => {
        const userDataItems = (userData['items'] === undefined)? [] : userData['items']
        // console.log(userDataItems)
        setItems(userDataItems)

        // items.map((k, o) => console.log(k, o))
    }, [])

    const handleDragStart = (event, type) => {

    }
      
    const allowDrop = (event) => {
        event.preventDefault()
    }
      
    const handleDrop = (event) => {
        event.preventDefault();

        const key = "text"
        const val = ""
        // setItems((prevItems) => [...prevItems, newItem])
        // setItems((p) => [...p, {[key]:val}])
        const p = items;
        p.push({[key]:val})
        setItems(p)
        setUserData({...userData, "items": items});
        console.log('data:', userData['items'])
        console.log('items:', items)
    }

    const handleContentChange = (val, i) => {
        const key = "text"
        // setItems((p) => [...p, {[key]:val}])
        // setUserData({...userData, "items": [...userData.items, {[key]: val}]})

        // const items = userData['items']

        const res = items.map((obj, idx) => {
            if(i === idx){
                if(obj.hasOwnProperty("text")) obj.text = val
            }

            return obj
        })

        //const uniqueItems = [...items.reduce((map, { key, val }) => map.set(key, { key, val }), new Map()).values()];

        setItems(res)
        setUserData({...userData, "items": res})
    }

    return (
        <div>
            <div className="course-container" onDrop={handleDrop} onDragOver={allowDrop}>
                {items.map((obj, idx) => (
                    <div className="course-item" key={idx}>
                        {obj.hasOwnProperty("text") && <div><TextField margin="normal" value={obj.text} onChange={(e) => handleContentChange(e.target.value, idx)} variant="outlined" color="secondary" /></div>}
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
