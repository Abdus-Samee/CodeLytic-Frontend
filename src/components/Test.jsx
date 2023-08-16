import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button, Divider, FormControlLabel, LinearProgress, RadioGroup, Radio, Typography } from "@mui/material"

import '../assets/css/test.css'

const Test = () => {
    const [progress, setProgress] = useState(0)
    const [period, setPeriod] = useState(0)
    const [current, setCurrent] = useState(0)
    const navigate = useNavigate()

    const quiz = [
        {
            question: 'What is the capital of Bangladesh?',
            ans: 'Dhaka',
            options: [
                'Dhaka',
                'Chittagong',
                'Rajshahi',
                'Khulna',
            ]
        }, 
        {
            question: 'Which one is a programming language?',
            ans: 'Java',
            options: [
                'HTML',
                'JavaScript',
                'Java',
                'CSS',
            ]
        }, 
        {
            question: 'Which one is a OOP language ?',
            ans: 'Java',
            options: [
                'JavaScript',
                'Java',
                'C',
                'HTML',
            ]
        }, 
        {
            question: 'Which one is a scripting language?',
            ans: 'JavaScript',
            options: [
                'HTML',
                'JavaScript',
                'Java',
                'C',
            ]
        }, 
        {
            question: 'Which one is a markup language?',
            ans: 'HTML',
            options: [
                'HTML',
                'C',
                'JavaScript',
                'Java',
            ]
        }, 
        {
            question: 'Which one is a styling language?',
            ans: 'CSS',
            options: [
                'HTML',
                'JavaScript',
                'Java',
                'CSS',
            ]
        }
    ]

    useEffect(() => {
        const l = quiz.length
        const p = 100 / l
        setPeriod(p)
        console.log('period', p)
    }, [])

    const handleNextClick = () => {
        setProgress(progress + period)
        setCurrent(current + 1)
        if (progress > 100) {
            setProgress(0)
        }
    }

    const handleBackClick = () => {
        setProgress(progress - period)
        setCurrent(current - 1)
        if (progress < 0) {
            setProgress(0)
        }
    }

    return (
        <div className="quiz-container">
            <LinearProgress className="quiz-progress" color="success" variant="determinate" value={progress} />
            <div className="quiz-body">
                <p className="quiz-question">
                    Q{current + 1}: {quiz[current].question}
                </p>
                <Divider variant="middle" sx={{ bgcolor: '#fff', width: '100%', margin: '0 auto', }} />
                <RadioGroup
                    className="quiz-options"
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue=""
                    name="radio-buttons-group"
                >
                    {quiz[current].options.map((option, index) => (
                        <FormControlLabel
                            className="quiz-option"
                            key={index}
                            value={option}
                            control={<Radio />}
                            label={option}
                        />
                    ))}
                </RadioGroup>
            </div>
            <div className="quiz-next-btn">
                <Button sx={{ width: '20%', marginLeft: '1vw', float: 'right', }} color="secondary" variant="contained" size="small" onClick={handleNextClick}>Next</Button>
                {current !== 0 && <Button sx={{ width: '20%', float: 'right', }} color="secondary" variant="contained" size="small" onClick={handleBackClick}>Back</Button>}
            </div>
        </div>
    )
}

export default Test
