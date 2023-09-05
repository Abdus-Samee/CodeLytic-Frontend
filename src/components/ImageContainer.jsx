import { useState, useRef } from "react"

import "../assets/css/imagecontainer.css"

const ImageContainer = ({src, idx, handleImageAddition}) => {
    const [imageData, setImageData] = useState(src)
    const [showSubmit, setShowSubmit] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const fileInputRef = useRef(null)

    const handleDrop = (e) => {
        e.preventDefault()
        const imageFile = e.dataTransfer.files[0]
        
        if(imageFile){
            const reader = new FileReader()

            reader.onload = () => {
                setImageData(reader.result)
                setShowSubmit(true)
            }

            reader.readAsDataURL(imageFile)
        }
    }

    const handleFileSelect = (e) => {
        const imageFile = e.target.files[0]
        if (imageFile) {
            const reader = new FileReader()
            reader.onload = () => {
                setImageData(reader.result)
                setShowSubmit(true)
            }
            reader.readAsDataURL(imageFile)
        }
    }

    const handleRemoveImage = () => {
        setImageData(null)
        setShowSubmit(false)
    }

    const handleSubmit = () => {
        setSubmitted(true)
        handleImageAddition(idx, imageData)
    }

    if(submitted){
        return (
            <div>
                <img src={imageData} alt="Uploaded" />
            </div>
        )
    }

    return (
        <div 
            className="img-container" 
            onDrop={handleDrop} 
            onDragOver={(e) => e.preventDefault()}
            onClick={() => fileInputRef.current.click()} 
        >
            {imageData ? (
                <img src={imageData} alt="Uploaded" />
            ) : (
                <div className="drag-text">
                    Drag & Drop or click to select an image
                </div>
            )}
            {showSubmit && <button onClick={handleSubmit}>Submit</button>}
            {showSubmit && <button onClick={handleRemoveImage}>Remove</button>}
            {!showSubmit && <input 
                type="file"
                accept="image/*"
                onClick={handleFileSelect}
                ref={fileInputRef}
                style={{ display: 'none', }}
            />}
        </div>
    )
}

export default ImageContainer