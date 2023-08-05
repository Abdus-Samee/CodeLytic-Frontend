import { useState, useEffect } from "react"
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Link } from "@mui/material"

const AnchorContainer = ({idx, handleLinkAddition}) => {
    const [anchorFormOpen, setAnchorFormOpen] = useState(true)
    const [name, setName] = useState("")
    const [url, setUrl] = useState("")
  
    const handleClose = () => {
      setAnchorFormOpen(false)

      if(name && url) handleLinkAddition(idx, name, url)
      else{
        setName("")
        setUrl("")
      }
    //   console.log(name, url)
    }

    return(
        <div>
            <Link href={url} underline="hover">{name}</Link>
            <Dialog open={anchorFormOpen} onClose={handleClose}>
                <DialogTitle>Enter Link Information</DialogTitle>
                <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Link Name"
                    type="text"
                    fullWidth
                    onChange={(e) => setName(e.target.value)}
                    variant="standard"
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="url"
                    label="Link URL"
                    type="text"
                    fullWidth
                    onChange={(e) => setUrl(e.target.value)}
                    variant="standard"
                />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Add</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default AnchorContainer