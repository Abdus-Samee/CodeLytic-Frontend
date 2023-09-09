import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
   Grid,  Container, TextField, Button, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Divider, Typography,
   Snackbar, CircularProgress
} from '@mui/material'
import MuiAlert from '@mui/material/Alert'

import ImmutableOption from './ImmutableOption'
import MutableOption from './MutableOption'
import QuizCard from './QuizCard'

import { createQuiz } from '../../../services/course-service'
import transition from '../../../transition'

const AddCourseQuiz = ({ token }) => {
  const [sid, setSid] = useState('')
  const [quiz, setQuiz] = useState([])
  const [qs, setQs] = useState('')
  const [ans, setAns] = useState('')
  const [options, setOptions] = useState([])
  const [warning, setWarning] = useState('')
  const [editQuestion, setEditQuestion] = useState(false)
  const [editIdx, setEditIdx] = useState(-1)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if(!token){
      navigate('/login')
    }

    const { sid } = location.state || {}
    if(sid) setSid(sid)
  }, [])

  // add an option to the list of options
  const handleOptionAddition = (option) => {
    if(!option) setWarning('No option added!')
    else setOptions((prev) => [...prev, { option: option, edit: false }])
  }

  // used to edit an option
  const handleEditOption = (i) => {
    const res = options.map((obj, idx) => {
      if (i === idx) {
        obj.edit = true
      }

      return obj
    })

    setOptions(res)
  }

  // used to edit a quiz question
  const handleEditQuestion = (i) => {
    const q = quiz[i]
    setQs(q.question)
    setAns(q.answer)
    setOptions(q.options)
    setEditQuestion(true)
    setEditIdx(i)
  }

  // helper function to update the edited question
  const editHelper = () => {
    const res = quiz.map((obj, idx) => {
      if (idx === editIdx) {
        obj.question = qs
        obj.answer = ans
        obj.options = options
      }

      return obj
    })

    setQuiz(res)
  }

  // update the edited option
  const mutToImmut = (i, opt) => {
    const res = options.map((obj, idx) => {
      if (i === idx) {
        if(!opt) setWarning('No option added!')
        else{
            obj.option = opt
            obj.edit = false
        }
      }

      return obj
    })

    setOptions(res)
  }

  // add the question to the quiz
  const submitQuestion = () => {
    if((qs === '') || (options.length === 0) || (ans === '')){
        if(qs == '') setWarning('Question field is empty!')
        if(options.length === 0) setWarning(prev => prev+'\n'+'No options have been added!')
        if(ans === '') setWarning(prev => prev+'\n'+'No answer has been assigned!')
    }else if(!warning){
        if(!editQuestion) setQuiz((prev) => [...prev, { question: qs, answer: ans, options: options }])
        else{
            editHelper()
            setEditQuestion(false)
            setEditIdx(-1)
        }

        setQs('')
        setAns('')
        setOptions([])
        console.log(quiz)
    }
  }

  // submit the quiz
  const proceed = () => {
    setLoading(true)

    const quizData = {
      questions: [
        ...quiz.map((obj) => {
          return {
            question: obj.question,
            options: [...obj.options.map((o) => o.option)],
            answer: obj.answer,
          }
        }),
      ],
    }

    const customHeaders = {
      Authorization: 'Bearer ' + token,
    }

    createQuiz(quizData, sid, customHeaders).then((res) => {
      setLoading(false)
      navigate(-1)
    }).catch(e => {
      console.log(e)
      setWarning('Error creating the quiz!')
      setLoading(false)
    })
  }

  const handleSnackbarClose = () => {
    setWarning('')
  }

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  })

  return (
    <>
        <Typography 
            variant='h6'
            color="primary"
            style={{ marginLeft: '51%', marginTop: '1vh', marginBottom: '1vh' }}>
                Add Quiz
        </Typography>
        <Grid container direction="row" justifyContent="space-around" alignItems="center">
            <Grid item xs={6} style={{ border: '1px solid #fff', padding: '1rem', }}>
                <Container>
                <TextField
                    multiline
                    variant="outlined"
                    label="Question"
                    color="primary"
                    minRows={4}
                    value={qs}
                    onChange={(e) => setQs(e.target.value)}
                    sx={{ bgcolor: 'white', }}
                    fullWidth
                />

                <div style={{ width: '100%' }}>
                    <FormControl>
                    <FormLabel
                        id="demo-radio-buttons-group-label"
                        style={{ color: 'pink', marginTop: '1vh' }}
                    >
                        Options
                    </FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue=""
                        name="radio-buttons-group"
                        onChange={(e) => setAns(e.target.value)}
                    >
                        {options.map((obj, idx) => (
                        <FormControlLabel
                            key={idx}
                            value={obj.option}
                            control={<Radio sx={{ color: 'white', }} />}
                            label={
                            <ImmutableOption
                                idx={idx}
                                option={obj.option}
                                edit={obj.edit}
                                handleEditOption={handleEditOption}
                                mutToImmut={mutToImmut}
                            />
                            }
                        />
                        ))}
                        <FormControlLabel
                        value=""
                        control={<></>}
                        label={
                            <MutableOption
                            value=""
                            handleOptionAddition={handleOptionAddition}
                            />
                        }
                        />
                    </RadioGroup>
                    </FormControl>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '3vw' }}>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={submitQuestion}
                    >
                        Add Quiz
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={proceed}
                    >
                        Submit
                    </Button>
                </div>
                </Container>
                {loading && <CircularProgress style={{ color: 'pink', marginLeft: '50%', }} />}
            </Grid>
            <Divider
                orientation="vertical"
                style={{ minHeight: '80vh', width: '1px' }}
                sx={{ bgcolor: '#fff', }}
            />
            <Grid item xs={5}>
                <Container>
                  {quiz.map((obj, idx) => (
                      <QuizCard key={idx} sl={idx + 1} obj={obj} handleEditQuestion={handleEditQuestion} />
                  ))}
                </Container>
            </Grid>
        </Grid>
        {warning !== '' && 
            <Snackbar
                open={true}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
            >
                <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>{warning}</Alert>
            </Snackbar>
        }
    </>
  )
}

export default transition(AddCourseQuiz)