import { useEffect, useState } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'

import { loadSingleLecture } from '../../../services/course-service'
import transition from '../../../transition'

import '../../../assets/css/showlecturecontent.css'
import { Button, CircularProgress } from '@mui/material'

const LectureContent = ({ content }) => {
    const [title, setTitle] = useState("")
    const [contentItems, setContentItems] = useState([])
    const [loading, setLoading] = useState(true)

    const params = useParams()
    const location = useLocation()
    const navigate = useNavigate()

    const lid = params.lectureId
    const { cid } = location.state || {}

    useEffect(() => {
        loadSingleLecture(lid).then((res) => {
            // console.log('Lecture: ', res)
            setTitle(res.title)
            const body = JSON.parse(res.body)
            setContentItems(body)
            setLoading(false)
            console.log("Lec body:", body)
        }).catch((err) => console.log(err))
    }, [])

    const handleBack = () => {
        if(cid == undefined) navigate('/courses')

        else navigate(`/course/${cid}`)
    }

    return (
        <>
            {loading ? <CircularProgress style={{ color: 'pink', marginLeft: '48vw', marginTop: '40vh' }} /> :
                <>
                    <span className="lec-back" onClick={handleBack}>Back to course</span>
                    <div className="lec-title">
                        <h1>{title}</h1>
                    </div>
                    <div className="display-lec-content">
                        {contentItems.map((o, k) => (
                            <div key={k} className="display-lec-content-item">
                                {o.key === 'h1' && <h1>{o.val}</h1>}
                                {o.key === 'h2' && <h2>{o.val}</h2>}
                                {o.key === 'text' && <p>{o.val}</p>}
                                {o.key === 'a' && <a href={o.val[1]} className="lec-link">{o.val[0]}</a>}
                                {o.key === 'ul' && 
                                    <ul>
                                        {o.val.map((item, key) => (
                                            <li key={key}>{item}</li>
                                        ))}
                                    </ul>
                                }
                            </div>
                        ))}
                    </div>
                    <div className="lec-btns">
                        <Button variant="contained" style={{ marginRight: '1vw', }}>Complete</Button>
                        <Button variant="contained" color="secondary" style={{ marginRight: '1vw', }}>Next</Button>
                    </div>
                </>
            }
        </>
    )
}

export default transition(LectureContent)