// components/TransitionPage.js
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
const pageVariants = {
  initial: { opacity: 0.6, x: '-2%' },
  in: { opacity: 1, x: '0%' },
  out: { opacity: 0.7, x: '0%' },
};

const pageTransition = {
  duration: 0.6,
  ease: "easeInOut",
};

const TransitionPage = ({ children }) => {
  const router = useRouter();

  return (
    <AnimatePresence
      mode="wait"
      onExitComplete={() => window.scrollTo(0, 0)}
    >
      <motion.div
        key={router.route}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default TransitionPage;
