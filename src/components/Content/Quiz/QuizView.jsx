import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Button, Divider, FormControlLabel, LinearProgress, RadioGroup, Radio, Typography, CircularProgress } from "@mui/material"

import { loadQuiz } from "../../../services/course-service"
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

    const navigate = useNavigate()
    const params = useParams()

    const quizId = params.quizId

    // const quiz = [
    //     {
    //         question: 'What is the capital of Bangladesh?',
    //         ans: 'Dhaka',
    //         options: [
    //             'Dhaka',
    //             'Chittagong',
    //             'Rajshahi',
    //             'Khulna',
    //         ]
    //     }, 
    //     {
    //         question: 'Which one is a programming language?',
    //         ans: 'Java',
    //         options: [
    //             'HTML',
    //             'JavaScript',
    //             'Java',
    //             'CSS',
    //         ]
    //     }, 
    //     {
    //         question: 'Which one is a OOP language ?',
    //         ans: 'Java',
    //         options: [
    //             'JavaScript',
    //             'Java',
    //             'C',
    //             'HTML',
    //         ]
    //     }, 
    //     {
    //         question: 'Which one is a scripting language?',
    //         ans: 'JavaScript',
    //         options: [
    //             'HTML',
    //             'JavaScript',
    //             'Java',
    //             'C',
    //         ]
    //     }, 
    //     {
    //         question: 'Which one is a markup language?',
    //         ans: 'HTML',
    //         options: [
    //             'HTML',
    //             'C',
    //             'JavaScript',
    //             'Java',
    //         ]
    //     }, 
    //     {
    //         question: 'Which one is a styling language?',
    //         ans: 'CSS',
    //         options: [
    //             'HTML',
    //             'JavaScript',
    //             'Java',
    //             'CSS',
    //         ]
    //     }
    // ]

    useEffect(() => {
        if(!token){
            navigate('/login')
        }

        const customHeaders = {
            Authorization: `Bearer ${token}`
        }

        loadQuiz(quizId, customHeaders).then((res) => {
            setQuestions(res.questions)

            const l = res.questions.length
            const p = 100 / l
            setlLength(l)
            setPeriod(p)
            setLoading(false)
            console.log('period', p)
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
        let score = 0
        for (let i = 0; i < length; i++) {
            if (questions[i].answer === answers[i]) {
                score += 1
            }
        }
        console.log('score', score)

        setScore(score)
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
                    {current !== 0 && <Button sx={{ width: '25%', float: 'right', }} color="secondary" variant="contained" size="small" onClick={handleBackClick}>
                        {score===-1 ? 'Back' : 'Try Again'}
                    </Button>}
                </div>
                {score!== -1 && <h2>Your score: {score}</h2>}
                </>
            }
        </div>
    )
}

export default transition(QuizView)