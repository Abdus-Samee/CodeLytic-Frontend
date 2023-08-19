import { useState, useEffect, useContext } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Button, TextField } from "@mui/material"

// import { multiStepContext } from "../StepContext"
import ImageContainer from "./ImageContainer"
import AnchorContainer from "./AnchorContainer"
import ListContainer from "./ListContainer"

import "../assets/css/coursecontent.css"

const AddCourseContent = ({ token }) => {
    const location = useLocation()
    const navigate = useNavigate()
    const [items, setItems] = useState([])
    // const { setCurrentStep, userData, setUserData } = useContext(multiStepContext)

    const contentItems = [
        'Heading', 'Sub-Heading', 'Text Box', 'Image', 'Link', 'List'
    ]

    useEffect(() => {
        if(!token){
            navigate('/login')
        }
        
        // const userDataItems = (userData['items'] === undefined)? [] : userData['items']
        const { propItems } = location.state || {}
        if(propItems) setItems(propItems)
        // console.log("useeffect items", items)
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
        if(type === "Image"){
            key = "img"
            val = null
        }else if(type === "Text Box") key = "text"
        else if(type === "Link"){
            key = "a"
            val = []
        }
        else if(type === "List"){
            key = "ul"
            val = []
        }
        else if(type === "Heading") key = "h1"
        else if(type === "Sub-Heading") key = "h2"

        // const p = items
        // p.push({[key]:val})
        setItems((current) => [...current, {'key': key, 'val': val}])
        // setUserData({...userData, "items": items})
        // console.log('data:', userData['items'])
        // console.log('items:', items)
    }

    const print = () => {
        console.log(items)
    }

    const handleContentChange = (val, i) => {
        const res = items.map((obj, idx) => {
            if(i === idx){
                if(obj.key === "ul") obj.val.push(val)
                else obj.val = val
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
                if(obj.key === "img") obj.val = imageFile
            }

            return obj
        })

        setItems(res)
        // setUserData({...userData, "items": res})
        console.log(items)
    }

    const handleLinkAddition = (i, name, url) => {
        const res = items.map((obj, idx) => {
            if(i === idx){
                if(obj.key === 'a') obj.val = [name, url]
            }

            return obj
        })

        setItems(res)
    }

    const handleItemDeletion = (list_idx, item_idx) => {
        const res = items.map((obj, key) => {
            if(list_idx === key){
                if(obj.key === "ul"){
                    obj.val.splice(item_idx, 1)
                }
            }

            return obj
        })

        setItems(res)
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
                            {obj.key==="text" && <div><TextField fullWidth multiline rows={8} margin="normal" value={obj.val} onChange={(e) => handleContentChange(e.target.value, idx)} variant="outlined" color="secondary" /></div>}
                            {obj.key==="img" && <div><ImageContainer src={obj.val} idx={idx} handleImageAddition={handleImageAddition} /></div>}
                            {obj.key==="a" && <div><AnchorContainer idx={idx} handleLinkAddition={handleLinkAddition} /></div>}
                            {obj.key==="h1" && 
                                <div>
                                    <TextField fullWidth size="small" margin="normal" value={obj.val} 
                                        onChange={(e) => handleContentChange(e.target.value, idx)} variant="outlined" color="primary" 
                                        inputProps={{style: {fontSize: '2em', fontWeight: 'bold'}}}
                                     />
                                </div>
                            }
                            {obj.key==="h2" && 
                                <div>
                                    <TextField fullWidth size="small" margin="normal" value={obj.val} 
                                        onChange={(e) => handleContentChange(e.target.value, idx)} variant="outlined" color="primary" 
                                        inputProps={{style: {fontSize: '1.17em', fontWeight: '700'}}}
                                     />
                                </div>
                            }
                            {obj.key==="ul" && <ListContainer idx={idx} items={obj.val} handleContentChange={handleContentChange} handleItemDeletion={handleItemDeletion} />}
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
                <Button variant="contained" color="primary" onClick={print}>
                    Submit Lecture
                </Button>
            </div>
        </div>
    )
}

export default AddCourseContent
