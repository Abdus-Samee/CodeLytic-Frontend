import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { authenticateUser } from "../../services/user-service"

import '../../assets/css/login.css'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        
    }, [])

    const handleSignUpClick = () => {
        navigate('/register')
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if(!email || !password){
            alert('Please fill all the fields')
            return
        }

        const user = {
            username: email,
            password,
        }

        authenticateUser(user).then((res) => {
            localStorage.setItem('codelytic-token', res.token)
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