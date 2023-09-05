import { useState, useEffect } from 'react'
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Button } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

const ListContainer = ({idx, items, handleContentChange, handleItemDeletion}) => {
    const [item, setItem] = useState('')
    // const [items, setItems] = useState([])

    const handleItemAddition = () => {
        // setItems(current => [...current, item])
        handleContentChange(item, idx)
        setItem('')
    }

    // const handleItemDeletion = (i) => {
    //     const res = items.splice(i, 1)

    //     // setItems(res)
    //     handleContentChange(items, idx)
    // }

    return(
        <div style={{ border: '1px solid #17141D', padding: '0.7rem', }}>
            <List sx={{ width: '50%', }}>
                {items.map((item, i) => (
                    <ListItem key={i} sx={{ color: '#17141D', }}>
                        <ListItemButton onClick={() => handleItemDeletion(idx, i)}>
                            <ListItemIcon>
                                <DeleteIcon />
                            </ListItemIcon>
                            <ListItemText primary={item}></ListItemText>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <input type="text" placeholder="Enter list item..." onChange={(e) => setItem(e.target.value)} style={{ width: '50%', padding: '0.7rem', border: '1px solid purple', }} />
            <button onClick={handleItemAddition} style={{ color: 'purple', marginLeft: '1vw', border: '1px solid green', padding: '0 1rem' }}>OK</button>
        </div>
    )
}

export default ListContainer