import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LandingPageProps {
  onAuthenticate: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onAuthenticate }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-black text-white">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="glowing-grid" />
      </div>

      {/* Content */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="z-10 text-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-1 mb-8 mx-auto"
            >
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                <span className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
                  G
                </span>
              </div>
            </motion.div>
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 text-transparent bg-clip-text animate-gradient">
              Welcome to Groov
            </h1>
            <p className="text-xl mb-8 text-gray-300">
              Your ultimate music companion
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onAuthenticate}
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Connect with Spotify
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating music notes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <MusicNotes />
      </div>
    </div>
  );
};

export const MusicNotes: React.FC = () => {
  const notes = [
    { id: 1, delay: 0 },
    { id: 2, delay: 2 },
    { id: 3, delay: 4 },
    { id: 4, delay: 6 },
  ];

  return (
    <>
      {notes.map(({ id, delay }) => (
        <motion.div
          key={id}
          initial={{ y: "100vh", x: Math.random() * 100 + "%", opacity: 0 }}
          animate={{
            y: "-100vh",
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 8,
            delay,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute text-purple-500 opacity-50"
        >
          ♪
        </motion.div>
      ))}
    </>
  );
};

export default LandingPage;