import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Player } from './components/Player';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorBoundary } from './components/ErrorBoundary';
import { useSpotifyAuth } from './hooks/useSpotifyAuth';
import { spotify } from './lib/spotify';
import { MusicNotes } from './components/LandingPage';
import { motion, AnimatePresence } from 'framer-motion';

const Home = lazy(() => import('./pages/Home').then(module => ({ default: module.Home })));
const Search = lazy(() => import('./pages/Search').then(module => ({ default: module.Search })));
const Library = lazy(() => import('./pages/Library').then(module => ({ default: module.Library })));

const App: React.FC = () => {
  const { isAuthenticated, isLoading, error } = useSpotifyAuth();

  useEffect(() => {
    document.body.style.overflow = !isAuthenticated ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isAuthenticated]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background p-4">
        <div className="glass p-8 rounded-2xl max-w-md w-full text-center">
          <p className="text-red-400 mb-4">{error.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-primary hover:bg-primary/90 rounded-xl transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-background p-4">
        <div className="absolute inset-0 overflow-hidden">
          <div className="glowing-grid" />
        </div>
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="glass p-8 rounded-2xl max-w-md w-full text-center z-10"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 via-purple-600 to-pink-500 p-0.5 animate-glow mx-auto mb-6"
            >
              <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                <span className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
                  G
                </span>
              </div>
            </motion.div>
            <motion.h1
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-purple-500 to-pink-400 text-transparent bg-clip-text animate-gradient mb-8"
            >
              Welcome to Groov
            </motion.h1>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => spotify.authenticate()}
              className="w-full px-6 py-3 bg-primary hover:bg-primary/90 rounded-xl transition-colors font-medium"
            >
              Connect with Spotify
            </motion.button>
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <MusicNotes />
        </div>
      </div>
    );
  }

  return (
    <Router>
      <ErrorBoundary>
        <div className="flex h-screen bg-background">
          <Sidebar />
          <main className="flex-1 overflow-auto pb-28">
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/library" element={<Library />} />
              </Routes>
            </Suspense>
          </main>
          <Player />
        </div>
      </ErrorBoundary>
    </Router>
  );
};

const MusicNotes: React.FC = () => {
  const notes = [
    { icon: '♪', size: 'text-2xl', duration: 15 },
    { icon: '♫', size: 'text-3xl', duration: 20 },
    { icon: '♩', size: 'text-xl', duration: 18 },
    { icon: '♬', size: 'text-4xl', duration: 22 },
  ];

  return (
    <>
      {notes.map((note, index) => (
        <motion.div
          key={index}
          className={`absolute ${note.size} text-purple-400 opacity-50`}
          initial={{ y: '100%', x: Math.random() * 100 + '%' }}
          animate={{
            y: '-100%',
            x: `calc(${Math.random() * 100}% + ${Math.random() * 50 - 25}px)`,
          }}
          transition={{
            duration: note.duration,
            repeat: Infinity,
            ease: 'linear',
            delay: Math.random() * 10,
          }}
        >
          {note.icon}
        </motion.div>
      ))}
    </>
  );
};

export default App;
