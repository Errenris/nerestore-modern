import '../styles/globals.css'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps }) {
  const router = useRouter()

  return (
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
  )
}
