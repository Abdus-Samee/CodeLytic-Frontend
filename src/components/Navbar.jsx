import { useRef } from "react"
import { NavLink } from 'react-router-dom'
import { FaBars, FaTimes } from "react-icons/fa"
import "../assets/css/navbar.css"

function Navbar() {
	const navRef = useRef();

	const showNavbar = () => {
		navRef.current.classList.toggle(
			"responsive_nav"
		)
	}

	const userId = 1
	const courseName = 'Dynamic Programming'
	const desc = 'Dp'
	const img = ''

	return (
		<header>
			<NavLink to="/">
				<img src="" alt="LOGO" />
			</NavLink>
			<nav ref={navRef}>
				<NavLink to="courses">Courses</NavLink>
				<NavLink to="create/course">Create Course</NavLink>
				<NavLink to="progress">Progress</NavLink>
				<NavLink to="discussion">Discussion</NavLink>
				<NavLink to={`user/${userId}`} state={{ courseName, desc, img }} className="profile">Profile</NavLink>	
				<NavLink to="/" className="logout">Logout</NavLink>
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