import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { storage } from "../services/firebase"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { v4 } from "uuid"

import '../assets/css/test.css'

const Test = () => {
    const [file, setFile] = useState(null)
    const [src, setSrc] = useState('')
    const [load, setLoad] = useState(false)

    const handleUpload = () => {
        if(file == null) return

        const imageRef = ref(storage, `images/${file.name}-${v4()}`)
        setLoad(true)
        uploadBytes(imageRef, file).then(() => {
            getDownloadURL(imageRef).then((url) => {
                setSrc(url)
                setLoad(false)
            })
        })
    }
    
    return (
        <div className="">
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <button onClick={handleUpload}>Upload</button>
            <br />
            {load ? (
                <p>Loading...</p>
            ) : (
                src && <img src={src} alt="" />
            )}
        </div>
    )
}

export default Test
