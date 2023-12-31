import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { registerUser } from "../../services/user-service"
import transition from "../../transition"

import '../../assets/css/register.css'

const Register = () => {
    const [name, setName] = useState('')
    const [role, setRole] = useState('USER')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        
    }, [])

    const handleRegister = () => {
        const user = {
            name,
            email,
            role,
            password
        }

        console.log('role: ', role, 'email: ', email, 'password: ', password)
        //take some time before navigating to /
        // setTimeout(() => {
        //     navigate('/courses')
        // }, 2000)

        registerUser(user).then((res) => {
            console.log(res)
            navigate('/login')
        }).catch(e => console.log(e))
    }

    return (
        <div className="register-container">
            <input class="c-checkbox" type="checkbox" id="start" />
            <input class="c-checkbox" type="checkbox" id="progress2" />
            <input class="c-checkbox" type="checkbox" id="progress3" />
            <input class="c-checkbox" type="checkbox" id="finish" />
            <div class="c-form__progress"></div>
            <div class="c-formContainer">
                <div class="c-welcome">Welcome aboard!</div>
                <form class="c-form" action="">
                    <div class="c-form__group">
                        <label class="c-form__label" for="role">
                            <input
                                type="text"
                                id="role"
                                class="c-form__input"
                                placeholder=" "
                                onChange={(e) => setName(e.target.value)}
                                pattern="[^\s]+"
                                required
                            />
                            <label class="c-form__next" for="progress2" role="button">
                                <span class="c-form__nextIcon"></span>
                            </label>
                            <span class="c-form__groupLabel">Select your name.</span>
                            <b class="c-form__border"></b>
                        </label>
                        <select className="c-formn__input" style={{ width: '70%', marginTop: '4vh', padding: '0.5rem' }} onChange={(e) => setRole(e.target.value)}>
                            <option value="USER">USER</option>
                            <option value="CONTENT_CREATOR">CONTENT_CREATOR</option>
                        </select>
                    </div>
                    <div class="c-form__group">
                        <label class="c-form__label" for="femail">
                            <input
                                type="email"
                                id="femail"
                                class="c-form__input"
                                placeholder=" "
                                onChange={(e) => setEmail(e.target.value)}
                                pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$"
                                required 
                            />
                            <label class="c-form__next" for="progress3" role="button">
                                <span class="c-form__nextIcon"></span>
                            </label>
                            <span class="c-form__groupLabel">What's your email?</span>
                            <b class="c-form__border"></b>
                        </label>
                    </div>
                    <div class="c-form__group">
                        <label class="c-form__label" for="fpass">
                            <input
                                type="password"
                                id="fpass"
                                class="c-form__input"
                                placeholder=" "
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <label class="c-form__next" for="finish" role="button" onClick={handleRegister}>
                                <span class="c-form__nextIcon"></span>
                            </label>
                            <span class="c-form__groupLabel">Create your password.</span>
                            <b class="c-form__border"></b>
                        </label>
                    </div>
                    <label class="c-form__toggle" for="start">Register<span class="c-form__toggleIcon"></span></label>
                </form>
            </div>
        </div>
    )
}

export default transition(Register)