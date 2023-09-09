import { useEffect, useState } from "react"
import { useNavigate, useParams, useLocation } from "react-router-dom"
import { Button, Divider, FormControlLabel, LinearProgress, RadioGroup, Radio, Snackbar, CircularProgress, Modal, Box } from "@mui/material"

import { loadQuiz, submitQuiz } from "../../../services/course-service"
import transition from "../../../transition"

import '../../../assets/css/quizview.css'

const QuizView = ({ token }) => {
    const [questions, setQuestions] = useState([])
    const [progress, setProgress] = useState(0)
    const [period, setPeriod] = useState(0)
    const [length, setlLength] = useState(0)
    const [current, setCurrent] = useState(0)
    const [answers, setAnswers] = useState({})
    const [loading, setLoading] = useState(true)
    const [score, setScore] = useState(-1)
    const [role, setRole] = useState('')
    const [open, setOpen] = useState(false)
    const [showDetails, setShowDetails] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [details, setDetails] = useState({})
    const [modalNext, setModalNext] = useState(true)
    const [modalBack, setModalBack] = useState(false)
    const [modalIndex, setModalIndex] = useState(0)

    const navigate = useNavigate()
    const params = useParams()
    const location = useLocation()

    const cid = location.state.cid
    const sid = location.state.sid
    const isAuthor = location.state.isAuthor

    const quizId = params.quizId

    const styleModal = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'orange',
        border: '2px solid #000',
        borderRadius: '10px',
        boxShadow: 24,
        p: 4,
    }

    useEffect(() => {
        if(!token){
            navigate('/login')
        }

        const user = JSON.parse(localStorage.getItem('codelytic-user'))
        setRole(user.role)

        const customHeaders = {
            Authorization: `Bearer ${token}`
        }

        loadQuiz(quizId, customHeaders).then((res) => {
            setQuestions(res.questions)
            // console.log(res.questions)

            const l = res.questions.length
            const p = 100 / l
            setlLength(l)
            setPeriod(p)
            setLoading(false)
            // console.log('period', p)
        }).catch((e) => console.log(e))
    }, [questions])

    const handleRadioClick = (value) => {
        setAnswers(prevAnswers => {
            return {
                ...prevAnswers,
                [current]: value
            }
        })
        console.log(answers)
    }

    const handleNextClick = () => {
        const newProgress = progress + period
        const newCurrent = current + 1

        if(score !== -1){
            navigate(-1)
        }
        else if (newProgress >= 100) {
            setProgress(100)
            checkAnswers()
        } else {
            setProgress(newProgress)
            setCurrent(newCurrent)
        }
    }

    const handleBackClick = () => {
        const newProgress = progress - period;
        const newCurrent = current - 1;

        if(score !== -1){
            setQuestions([])
            setProgress(0)
            setPeriod(0)
            setlLength(0)
            setCurrent(0)
            setAnswers({})
            setScore(-1)
            setLoading(true)
        }
        else if (newProgress < 0) {
            setProgress(0);
            setCurrent(0);
        } else {
            setProgress(newProgress);
            setCurrent(newCurrent);
        }
    }

    //connect to db
    const checkAnswers = () => {
        setOpen(true)

        let score = 0
        let scores = {}
        for (let i = 0; i < length; i++) {
            if (questions[i].answer === answers[i]) {
                score += 1
                scores = {...scores, [questions[i].id]: 1}
            }else{
                scores = {...scores, [questions[i].id]: 0}
            }
        }

        console.log('score', score)

        if(role === "USER" && !isAuthor){
            const customHeaders = {
                Authorization: `Bearer ${token}`
            }

            submitQuiz(cid, sid, scores, customHeaders).then((res) => {
                console.log(res)
                if(res.status === 'failed'){
                    alert('Cannot submit quiz')
                    setOpen(false)
                }else{
                    setScore(score)
                    setOpen(false)
                    setShowDetails(true)
                }
            }).catch((e) => console.log(e))
        }else{
            setScore(score)
            setOpen(false)
        }
    }

    return (
        <div className="quiz-container">
            {loading ? <CircularProgress style={{ color: 'pink', margin: '0 auto', }} /> :
                <>
                    <LinearProgress className="quiz-progress" color="success" variant="determinate" value={progress} />
                    <div className="quiz-body">
                        <p className="quiz-question">
                            Q{current + 1}: {questions[current].question}
                        </p>
                        <Divider variant="middle" sx={{ bgcolor: '#fff', width: '100%', margin: '0 auto', }} />
                        <RadioGroup
                            className="quiz-options"
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue=""
                            name="radio-buttons-group"
                            onChange={(e) => {handleRadioClick(e.target.value)}}
                        >
                            {questions[current].options.map((option, index) => (
                                <FormControlLabel
                                    className="quiz-option"
                                    key={index}
                                    value={option}
                                    control={<Radio checked={answers[current]===option? true : false} style={{ color: '#F3AF96'}} />}
                                    label={option}
                                />
                            ))}
                        </RadioGroup>
                    </div>
                    <div className="quiz-next-btn">
                        <Button sx={{ width: '20%', marginLeft: '1vw', float: 'right', }} color="secondary" variant="contained" size="small" onClick={handleNextClick}>
                            {current === length - 1 ? (score===-1 ? 'Submit' : 'Go Back') : 'Next'}
                        </Button>
                        {current !== 0 && score === -1 && <Button sx={{ width: '25%', float: 'right', }} color="secondary" variant="contained" size="small" onClick={handleBackClick}>
                            Back
                        </Button>}
                        {showDetails && <Button variant="contained" onClick={() => setOpenModal(true)}>Details</Button>}
                    </div>
                    {score!== -1 && <h2>Your score: {score}</h2>}
                    <Modal
                        open={openModal}
                        onClose={() => setOpenModal(false)}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={styleModal}>
                            <h1 id="subsection-modal-title">Quiz Details</h1>
                            <div>
                                <h3>{questions[modalIndex].question}</h3>
                                <p>Your answer:</p>
                                <p style={{ color: questions[modalIndex].answer === answers[modalIndex] ? 'green' : 'red', }}>{answers[modalIndex]}</p>
                                {questions[modalIndex].answer !== answers[modalIndex] && <p>Correct answer: {questions[modalIndex].answer}</p>}
                                {modalIndex > 0 && <Button variant="contained" size="small" style={{ marginRight: '1vw', }} onClick={() => setModalIndex(modalIndex-1)}>Back</Button>}
                                {modalIndex < length-1 && <Button variant="contained" size="small" color="secondary" onClick={() => setModalIndex(modalIndex+1)}>Next</Button> }
                            </div>
                        </Box>
                    </Modal>
                </>
            }
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                open={open}
                onClose={() => setOpen(false)}
                key="bottomcenter"
            >
                <div style={{ background: '#5765FF', padding: '0.5rem 5rem', borderRadius: '10px', }}>
                    <span 
                        style={{
                            display: 'inline',
                            color: '#000',
                            fontFamily: '"DM Mono", monospace',
                        }}>
                            Submitting quiz...
                    </span>
                    <CircularProgress style={{ height: '10%', width: '10%', color: 'yellow', marginLeft: '45%', }} />
                </div>
            </Snackbar>
        </div>
    )
}

export default transition(QuizView)