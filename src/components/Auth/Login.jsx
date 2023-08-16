import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import '../../assets/css/login.css'

const Login = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        
    }, [])

    const handleSignUpClick = () => {
        navigate('/register')
    }

    const handleSignInClick = () => {
        setIsRightPanelActive(false)
    }

    return (
        <div class="auth-container" id="container">
            <div class="form-container sign-in-container">
                <form className="auth-form">
                    <h1 className="auth-h1">Sign in</h1>
                    <input type="email" className="auth-input" placeholder="Email" />
                    <input type="password" className="auth-input" placeholder="Password" />
                    <button className="auth-btn">Sign In</button>
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

export default Login