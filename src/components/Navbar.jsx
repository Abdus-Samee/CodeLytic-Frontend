import { useEffect, useState, useRef } from "react"
import { NavLink } from 'react-router-dom'
import { FaBars, FaTimes } from "react-icons/fa"

import "../assets/css/navbar.css"

import logo from "../assets/img/logo.png"

function Navbar({ token, user, handleLogout}) {
	// const [role, setRole] = useState('')
	const navRef = useRef();

	const showNavbar = () => {
		navRef.current.classList.toggle(
			"responsive_nav"
		)
	}

	useEffect(() => {
		// const user = JSON.parse(localStorage.getItem('codelytic-user'))
		// if(user){
		// 	const { role } = user
		// 	console.log(role)
		// 	setRole(role)
		// }
	}, [])

	return (
		<header>
			<NavLink to="/" className="navbar-logo">
				<img src={logo} alt="LOGO" />
			</NavLink>
			<nav ref={navRef}>
				<NavLink to="courses">Courses</NavLink>
				{token && user && user?.role === "CONTENT_CREATOR" && <NavLink to="create/course">Create Course</NavLink>}
				{token && user && user?.role !== "ADMIN" && <NavLink to="progress">Progress</NavLink>}
				<NavLink to="discussion">Discussion</NavLink>
				{token && (
					<>
						{(user && user?.role === "ADMIN" )? <NavLink to="admin" className="register-link">Admin</NavLink> : <NavLink to="user" className="register-link">Profile</NavLink>}
						<NavLink to="courses" className="login-link" onClick={handleLogout}>Logout</NavLink>
					</>
				)}
				{!token && (
					<>
						<NavLink to="register" className="register-link">Register</NavLink>
						<NavLink to="login" className="login-link">LogIn</NavLink>
					</>
				)}	
				<button
					className="nav-btn nav-close-btn"
					onClick={showNavbar}>
				<FaTimes />
				</button>
			</nav>
			<button
				className="nav-btn"
				onClick={showNavbar}>
				<FaBars />
			</button>
		</header>
	);
}

export default Navbar