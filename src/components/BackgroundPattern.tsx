import { motion } from 'framer-motion'
import './BackgroundPattern.css'

const BackgroundPattern = () => {
    return (
        <div className="background-pattern-container">
            <motion.div
                className="background-logo-wrapper"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.03 }}
                transition={{ duration: 1.5 }}
            >
                {/* We use the logo.svg but scale it up massively via CSS */}
                <img src="/logo.svg" alt="" className="background-logo" />
            </motion.div>
        </div>
    )
}

export default BackgroundPattern
