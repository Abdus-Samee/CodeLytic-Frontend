import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { storage } from "../services/firebase"

import { getUser } from "../services/user-service"

// import '../assets/css/test.css'

const Test = ({ token }) => {
    const navigate = useNavigate()

    useEffect(() => {
        if(!token){
            navigate('/login')
        }
    
    const customHeaders = {
        Authorization: 'Bearer ' + token,
    }

    //pass to backend to get user details
    getUser(customHeaders).then((res) => {
        console.log("User: ", res)
    }).catch(e => console.log(e))

    }, [])
    
    return (
        <div className="">
            Test
        </div>
    )
}

export default Test
