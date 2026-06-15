import '../styles/globals.css'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -1000, y: -1000 })

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', updateMousePosition)
    return () => window.removeEventListener('mousemove', updateMousePosition)
  }, [])

  return (
    <motion.div
      className="custom-cursor hidden md:block" // Sembunyikan di HP
      animate={{ x: mousePosition.x - 150, y: mousePosition.y - 150 }}
      transition={{ type: "spring", stiffness: 100, damping: 25, mass: 0.5 }}
    />
  )
}

export default function App({ Component, pageProps }) {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  return (
    <>
      {mounted && <CustomCursor />}
      <AnimatePresence mode="wait">
        <motion.div
          key={router.route}
          initial="initialState"
          animate="animateState"
          exit="exitState"
          transition={{ duration: 0.4 }}
          variants={{
            initialState: { opacity: 0, y: 15 },
            animateState: { opacity: 1, y: 0 },
            exitState: { opacity: 0, y: -15 },
          }}
          className="min-h-screen"
        >
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
    </>
  )
}
