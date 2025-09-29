import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Result from "./pages/Result";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import IntroAnimation from "./pages/IntroAnimation";

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [hasSeenIntro, setHasSeenIntro] = useState(false);

  // Check if user has already seen the intro in this session
  // useEffect(() => {
  //   const introSeen = sessionStorage.getItem('introSeen');
  //   if (introSeen === 'true') {
  //     setShowIntro(false);
  //     setHasSeenIntro(true);
  //   }
  // }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
    setHasSeenIntro(true);
    // Store in sessionStorage so intro only shows once per session
    sessionStorage.setItem('introSeen', 'true');
  };

  return (
    <>
      {showIntro && <IntroAnimation onComplete={handleIntroComplete} />}

      <div style={{ opacity: hasSeenIntro ? 1 : 0, transition: 'opacity 0.5s ease' }}>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/result" element={<Result />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;