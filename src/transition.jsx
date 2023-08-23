import { motion } from "framer-motion"

const transition = (OgComponent) => {
    return (props) => (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{ duration: 1}}>
            <OgComponent {...props} />              
        </motion.div>
    )
}

export default transition