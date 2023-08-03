import { useState, useEffect, useContext } from "react"
import { Button, TextField } from "@mui/material"

import { multiStepContext } from "../StepContext"
import ImageContainer from "./ImageContainer"

import "../assets/css/coursecontent.css"

const AddCourseContent = () => {
    const [items, setItems] = useState([])
    const { setCurrentStep, userData, setUserData } = useContext(multiStepContext)

    const contentItems = [
        'Text Box', 'Image', 'Link', 'List'
    ]

    useEffect(() => {
        const userDataItems = (userData['items'] === undefined)? [] : userData['items']
        setItems(userDataItems)
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

        // setItems((prevItems) => [...prevItems, newItem])
        // setItems((p) => [...p, {[key]:val}])
        const p = items
        p.push({[key]:val})
        setItems(p)
        setUserData({...userData, "items": items})
        console.log('data:', userData['items'])
        console.log('items:', items)
    }

    const handleContentChange = (val, i) => {
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

    const handleImageAddition = (i, imageFile) => {
        console.log("img addition: ", i)
        const res = items.map((obj, idx) => {
            if(i === idx){
                if(obj.hasOwnProperty("img")) obj.img = imageFile
            }

            return obj
        })

        setItems(res)
        setUserData({...userData, "items": res})
        console.log(userData)
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
