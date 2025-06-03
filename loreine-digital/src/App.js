import React from "react"; // Removed useEffect from here if not used for other purposes
import { Routes, Route, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop"; // Adjust path if needed

import About from "./pages/About";
import Services from "./pages/Services";
import Pricing from "./pages/Pricing";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";

// Animation variants for page transitions
const pageVariants = {
  initial: {
    opacity: 0,
    x: -30
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.25,
      ease: "easeInOut"
    }
  },
  exit: {
    opacity: 0,
    x: 30,
    transition: {
      duration: 0.2,
      ease: "easeInOut"
    }
  }
};

// Component for the subtle loading indicator (keeping as is from your code)
const RouteTransitionIndicator = () => (
  <div className="route-transition-indicator" />
);

function App() {
  const location = useLocation();

  return (
    <div className="app">
      <ScrollToTop /> {/* Add the ScrollToTop component here */}
      <Header />
      
      {/* data-animate-presence seems like a custom attribute for your styling, AnimatePresence itself uses the 'mode' prop */}
      <AnimatePresence mode="wait"> {/* Ensure 'mode' is what you intend, 'wait' is common */}
        {/* Subtle loading indicator - Its behavior with AnimatePresence depends on its key and conditional rendering */}
        {/* If this indicator should always be visible during transitions, its current placement is fine. */}
        {/* However, often AnimatePresence children are the routes themselves with unique keys. */}
        {/* For simplicity in this example, I'm leaving your RouteTransitionIndicator as is. */}
        {/* If it's meant to be part of the exiting/entering page, it should be keyed like the routes. */}
        <RouteTransitionIndicator key={`indicator-${location.pathname}`} /> {/* Example if it should also animate with routes */}

        {/* Page routes with transitions */}
        {/* The key on Routes or on its direct child <motion.div> ensures AnimatePresence detects changes */}
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <motion.div
                key="home" // Add a unique key to direct children of AnimatePresence (or its descendant managing animated items)
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="page-content"
              >
                <Home />
              </motion.div>
            }
          />
          <Route
            path="/about"
            element={
              <motion.div
                key="about"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="page-content"
              >
                <About />
              </motion.div>
            }
          />
          <Route
            path="/services"
            element={
              <motion.div
                key="services"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="page-content"
              >
                <Services />
              </motion.div>
            }
          />
          <Route
            path="/pricing"
            element={
              <motion.div
                key="pricing"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="page-content"
              >
                <Pricing />
              </motion.div>
            }
          />
          <Route
            path="/blogs"
            element={
              <motion.div
                key="blogs"
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="page-content"
              >
                <Blogs />
              </motion.div>
            }
          />
        </Routes>
      </AnimatePresence>

      <Footer />
      
      {/* Global styles for the transition indicator */}
      <style jsx global>{`
        @keyframes fadePulse {
          0%, 100% { opacity: 0.4; transform: scale(0.9); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }
        
        .route-transition-indicator {
          position: fixed;
          bottom: 24px;
          right: 24px;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #3b82f6;
          animation: fadePulse 1.2s ease-in-out infinite;
          z-index: 1000;
          pointer-events: none;
          /* display: none; -- Controlled by AnimatePresence or other logic if keyed */
          /* The [data-animate-presence] .route-transition-indicator selector might be how you were toggling it. */
          /* If RouteTransitionIndicator is keyed as a child of AnimatePresence, Framer Motion handles its appearance/disappearance. */
        }
        
        /* Removed [data-animate-presence] selector as AnimatePresence handles children directly */
        /* If you still need it for a specific purpose with your custom attribute, you can add it back. */

        .page-content {
          min-height: calc(100vh - 120px); /* Adjust based on header/footer height */
        }
      `}</style>
    </div>
  );
}

export default App;