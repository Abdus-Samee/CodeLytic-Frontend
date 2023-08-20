import { useState } from 'react'
import { TextField, Button, Typography } from '@mui/material'

const ImmutableOption = ({
  idx,
  option,
  edit,
  handleEditOption,
  mutToImmut,
}) => {
  const [val, setVal] = useState(option)

  const handleEdit = () => {
    handleEditOption(idx) // edit->false is passed
  }

  const handleOptionChange = () => {
    mutToImmut(idx, val) // edit->true is passed
  }

  return (
    <div style={{ padding: '1vw' }}>
      {edit ? (
        <>
          <TextField
            value={val}
            onChange={(e) => setVal(e.target.value)}
            style={{ background: 'white', width: '40vw' }}
          />
          <Button onClick={handleOptionChange}>Update</Button>
        </>
      ) : (
        <>
          <Typography style={{ display: 'inline' }}>{option}</Typography>
          <Button onClick={handleEdit}>Edit</Button>
        </>
      )}
    </div>
  )
}

export default ImmutableOption