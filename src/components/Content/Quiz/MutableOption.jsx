import { useState } from 'react'
import { TextField, Button } from '@mui/material'

const MutableOption = ({ value, handleOptionAddition }) => {
  const [option, setOption] = useState(value)

  const handleAdd = () => {
    handleOptionAddition(option)
    setOption('')
  }

  return (
    <div>
      <TextField
        value={option}
        onChange={(e) => setOption(e.target.value)}
        style={{ marginLeft: '1vw', width: '40vw' }}
      />
      <Button onClick={handleAdd}>Add</Button>
    </div>
  )
}

export default MutableOption