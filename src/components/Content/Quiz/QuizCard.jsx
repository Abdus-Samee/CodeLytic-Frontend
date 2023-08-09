import {
    Box, Radio, RadioGroup, FormControlLabel, FormControl, Button, Divider, Typography, Accordion, AccordionSummary, AccordionDetails
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const QuizCard = ({ sl, obj, handleEditQuestion }) => {
  const { question, ans, options } = obj

  const handleEdit = () => {
    handleEditQuestion(sl - 1)
  }

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>Question - {sl}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: '#263238', p: 2 }}>
          <Box sx={{ my: 3, mx: 2 }}>
            <Typography color="white" variant="h6">
              {question}
            </Typography>
          </Box>
          <Divider variant="middle" />
          <Box sx={{ m: 2, bgcolor: '#cfd8dc', p: 3 }}>
            <Typography gutterBottom variant="body2">
              Options
            </Typography>
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                {options.map((d, i) => (
                  <FormControlLabel
                    value="disabled"
                    key={i}
                    disabled
                    control={
                      <Radio checked={d.option === ans ? true : false} />
                    }
                    label={d.option}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Box>
          <Box sx={{ mt: 3, ml: 1, mb: 1 }}>
            <Button variant="contained" color="primary" onClick={handleEdit}>
              Edit Question
            </Button>
          </Box>
        </Box>
      </AccordionDetails>
    </Accordion>
  )
}

export default QuizCard