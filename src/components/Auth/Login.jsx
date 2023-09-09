import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { CircularProgress } from "@mui/material"

import { authenticateUser } from "../../services/user-service"
import transition from "../../transition"

import '../../assets/css/login.css'

const Login = ({ setToken }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        
    }, [])

    const handleSignUpClick = () => {
        navigate('/register')
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)

        if(!email || !password){
            alert('Please fill all the fields')
            return
        }

        const user = {
            username: email,
            password,
        }

        authenticateUser(user).then((res) => {
            // localStorage.setItem('codelytic-user', email)
            setToken(res.token)
            setLoading(false)
            navigate('/user')
            // if(res.status === 200){
            //     localStorage.setItem('codelytic-token', res.data.token)
            //     navigate('/dashboard')
            // } else {
            //     alert('Invalid credentials')
            // }
        }).catch((e) => console.log(e))
    }

    const handleSignInClick = () => {
        setIsRightPanelActive(false)
    }

    return (
        <div class="auth-container" id="container">
            <div class="form-container sign-in-container">
                <form className="auth-form" onSubmit={handleSubmit}>
                    <h1 className="auth-h1">Sign in</h1>
                    <input type="email" className="auth-input" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" className="auth-input" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit" className="auth-btn">Sign In</button>
                    {loading && <CircularProgress style={{ color: '#FF4B2B', margin: '0 auto', padding: '1vh' }} />}
                </form>
            </div>
            <div class="overlay-container">
                <div class="overlay">
                    <div class="overlay-panel overlay-right">
                        <h1 className="auth-h1" style={{ color: "#fff", }}>Hello, Friend!</h1>
                        <p className="auth-p">Enter your personal details and start journey with us</p>
                        <button className="ghost auth-btn" id="signUp" onClick={handleSignUpClick}>Register</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default transition(Login)