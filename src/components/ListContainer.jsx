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
        <div>
            <List>
                {items.map((item, i) => (
                    <ListItem key={i} disablePadding>
                        <ListItemButton onClick={() => handleItemDeletion(idx, i)}>
                            <ListItemIcon>
                                <DeleteIcon />
                            </ListItemIcon>
                            <ListItemText primary={item}></ListItemText>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <input type="text" onChange={(e) => setItem(e.target.value)} />
            <button onClick={handleItemAddition}>OK</button>
        </div>
    )
}

export default ListContainer