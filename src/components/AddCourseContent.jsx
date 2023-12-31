import { useState, useEffect, useContext } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Button, CircularProgress, TextField } from "@mui/material"
import { ref, uploadBytes, getDownloadURL, uploadString, getStorage } from "firebase/storage"
import { v4 } from "uuid"

import ImageContainer from "./ImageContainer"
import AnchorContainer from "./AnchorContainer"
import ListContainer from "./ListContainer"

import { storage } from "../services/firebase"
import { createLecture } from "../services/course-service"
import transition from "../transition"

import "../assets/css/coursecontent.css"

const AddCourseContent = ({ token }) => {
    const location = useLocation()
    const navigate = useNavigate()
    const [title, setTitle] = useState("")
    const [items, setItems] = useState([])
    // const [sid, setSid] = useState(null)
    const [imgRefs, setImgRefs] = useState([])
    const [downloadUrls, setDownloadUrls] = useState([])
    const [loading, setLoading] = useState(false)
    // const { setCurrentStep, userData, setUserData } = useContext(multiStepContext)

    const contentItems = [
        'Heading', 'Sub-Heading', 'Text Box', 'Image', 'Link', 'List'
    ]

    const { cid, sid } = location.state || {}

    useEffect(() => {
        if(!token){
            navigate('/login')
        }
        
        // const userDataItems = (userData['items'] === undefined)? [] : userData['items']
        // const { sid } = location.state || {}
        // setSid(sid)
        // console.log("useeffect", sid)
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
        if(key == "" && val == "") return

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

    const uploadDataUrl = (dataUrl) => {
        // console.log("uploading...", dataUrl)
        const imageRef = ref(storage, `contents/${v4()}`)
        setImgRefs(prev => [...prev, imageRef])

        return uploadString(imageRef, dataUrl, 'data_url').then(() => {
            return getDownloadURL(imageRef)
        })
    }

    const handleSubmitLecture = () => {
        setLoading(true)
        const uploadPromises = []
            
        const customHeaders = {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        }

        items.map(item => {
            if(item.key === "img") uploadPromises.push(uploadDataUrl(item.val))
        })

        if(uploadPromises.length > 0){
            Promise.all(uploadPromises).then((urls) => {
                setLoading(false)
                console.log("All uploads completed")

                let imageIndex = 0
                const changedItems = items.map((item, idx) => {
                    if(item.key === "img"){
                        item.val = urls[imageIndex]
                        imageIndex += 1
                    }

                    return item
                })

                // console.log("Changed...", changedItems)
                setItems(changedItems)

                const lecture = {
                    id: 0,
                    title: title,
                    body: JSON.stringify(items),
                    live: true,
                }
        
                console.log("Lecture Content: ", lecture)

                createLecture(lecture, sid, customHeaders).then(res => {
                    console.log(res)
                    navigate(-1)
                }).catch(e => {
                    console.log(e)
                    setLoading(false)
                    alert("Error in creating lecture")
                })
            }).catch((e) => console.log(e))
        }else{
            const lecture = {
                id: 0,
                title: title,
                body: JSON.stringify(items),
                live: true,
            }
    
            console.log("Lecture Content: ", lecture)

            createLecture(lecture, sid, customHeaders).then(res => {
                console.log(res)
                navigate(`/course/${cid}`)
            }).catch(e => {
                console.log(e)
                alert("Error in creating lecture")
            })
        }
    }

    return (
        <div>
            <div className="box">
                <div className="course-container" onDrop={handleDrop} onDragOver={allowDrop}>
                    <TextField fullWidth size="small" margin="normal" value={title} placeholder="Enter title of Lecture" onChange={(e) => setTitle(e.target.value)} variant="outlined" color="primary" />
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
                <Button variant="contained" color="primary" disabled={loading} onClick={handleSubmitLecture}>
                    Submit Lecture
                </Button>
                {loading && <CircularProgress color="secondary" style={{ color: 'pink', marginBottom: '-1vh', marginLeft: '1vw', }} />}
            </div>
        </div>
    )
}

export default transition(AddCourseContent)
