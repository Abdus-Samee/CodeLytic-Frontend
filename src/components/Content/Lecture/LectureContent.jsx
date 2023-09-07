import { Button, CircularProgress } from '@mui/material'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { completeLecture, loadSingleLecture } from '../../../services/course-service'
import { getCourseProgress } from '../../../services/user-service'
import transition from '../../../transition'

import '../../../assets/css/showlecturecontent.css'

const LectureContent = ({ token }) => {
    const [title, setTitle] = useState("")
    const [contentItems, setContentItems] = useState([])
    const [isComplete, setIsComplete] = useState(false)
    const [loading, setLoading] = useState(true)
    const [completeAction, setCompleteAction] = useState(false)
    const [nextAction, setNextAction] = useState(false)

    const params = useParams()
    const location = useLocation()
    const navigate = useNavigate()

    const lid = params.lectureId
    const { cid, sid } = location.state || {}

    useEffect(() => {
        loadSingleLecture(lid).then((res) => {
            // console.log('Lecture: ', res)
            setTitle(res.title)
            const body = JSON.parse(res.body)
            setContentItems(body)
            setLoading(false)
            console.log("Lec body:", body)

            const customHeaders = {
                Authorization: 'Bearer ' + token,
            }

            getCourseProgress(cid, customHeaders).then((res) => {
                // console.log("Course progress: ", res)
                const { subsectionsProgresses } = res
                subsectionsProgresses.forEach((o) => {
                    //find if there is a key of cid in o.lectures(an object)
                    console.log("Lectures: ", o.lectures)
                    if(o.lectures){
                        if(o.lectures[lid] !== undefined){
                            setIsComplete(true)
                            // if(o.lectures[cid][lid] !== undefined){
                            //     setIsComplete(o.lectures[cid][lid])
                            // }
                        }
                    }
                })
            }).catch((err) => console.log(err))
        }).catch((err) => console.log(err))
    }, [])

    const handleBack = () => {
        if(cid == undefined) navigate('/courses')

        else navigate(`/course/${cid}`)
    }

    const handleComplete = () => {
        setCompleteAction(true)
        completeLecture(cid, sid, lid).then((res) => {
            setCompleteAction(false)
            console.log(res)
            navigate(`/course/${cid}`)
        }).catch((err) => console.log(err))        
    }

    const handleNext = () => {
        setNextAction(true)
        //wait 3s
        setTimeout(() => {
            setNextAction(false)
        }, 3000)
    }

    return (
        <>
            {loading ? <CircularProgress style={{ color: 'pink', marginLeft: '48vw', marginTop: '40vh' }} /> :
                <>
                    <span className="lec-back" onClick={handleBack}>Back to course</span>
                    <div className="">
                        <h1 className="lec-title">{title}</h1>
                    </div>
                    <div className="display-lec-content">
                        {contentItems.map((o, k) => (
                            <div key={k} className="display-lec-content-item">
                                {o.key === 'h1' && <h1 className="lec-heading">{o.val}</h1>}
                                {o.key === 'h2' && <h2 className="lec-sub-heading">{o.val}</h2>}
                                {o.key === 'text' && <p className="lec-text">{o.val}</p>}
                                {o.key === 'a' && <a href={o.val[1]} target="_blank" className="lec-link">{o.val[0]}</a>}
                                {o.key === 'ul' && 
                                    <ul className="lec-ul">
                                        {o.val.map((item, key) => (
                                            <li key={key}>{item}</li>
                                        ))}
                                    </ul>
                                }
                                {o.key === "img" && 
                                    <div className="lec-img-container">
                                        <img src={o.val} alt="Uploaded" className="lec-img" />
                                    </div>
                                }
                            </div>
                        ))}
                    </div>
                    <div className="lec-btns">
                        {token && !isComplete && <Button variant="contained" disabled={nextAction} style={{ marginRight: '1vw', }} onClick={handleComplete}>Complete</Button>}
                        <Button variant="contained" color="secondary" disabled={completeAction} style={{ marginRight: '1vw', }} onClick={handleNext}>Next</Button>
                        {nextAction && <CircularProgress style={{ color: 'pink', marginTop: '0', marginBottom: '-1vh' }} />}
                        {completeAction && <CircularProgress style={{ color: 'pink', marginTop: '0', marginBottom: '-1vh' }} />}
                    </div>
                </>
            }
        </>
    )
}

export default transition(LectureContent)