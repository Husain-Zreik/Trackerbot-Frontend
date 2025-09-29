import { useState, useEffect } from 'react';

const IntroAnimation = ({ onComplete }) => {
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [showLogo, setShowLogo] = useState(false);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        // Loading bar animation
        const interval = setInterval(() => {
            setLoadingProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setShowLogo(true), 300);
                    return 100;
                }
                // Randomized progress for more dynamic feel
                return prev + Math.random() * 8 + 2;
            });
        }, 80);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (showLogo) {
            // Fade out after logo animation
            setTimeout(() => {
                setFadeOut(true);
                setTimeout(() => onComplete?.(), 800);
            }, 2000);
        }
    }, [showLogo, onComplete]);

    return (
        <div className={`intro-container ${fadeOut ? 'intro-fade-out' : ''}`}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');

                .intro-container {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    background: linear-gradient(135deg, #05090a 0%, #0c1013 50%, #05090a 100%);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    z-index: 9999;
                    overflow: hidden;
                    transition: opacity 0.8s ease;
                }

                .intro-fade-out {
                    opacity: 0;
                }

                /* Animated background particles */
                .intro-container::before {
                    content: '';
                    position: absolute;
                    width: 200%;
                    height: 200%;
                    background-image: 
                        radial-gradient(2px 2px at 20% 30%, rgba(0, 255, 136, 0.3), transparent),
                        radial-gradient(2px 2px at 60% 70%, rgba(0, 255, 136, 0.2), transparent),
                        radial-gradient(1px 1px at 50% 50%, rgba(0, 255, 136, 0.15), transparent),
                        radial-gradient(1px 1px at 80% 10%, rgba(0, 255, 136, 0.2), transparent),
                        radial-gradient(2px 2px at 90% 60%, rgba(0, 255, 136, 0.25), transparent),
                        radial-gradient(1px 1px at 33% 85%, rgba(0, 255, 136, 0.2), transparent),
                        radial-gradient(1px 1px at 75% 25%, rgba(0, 255, 136, 0.15), transparent);
                    background-size: 200% 200%;
                    animation: particles 20s linear infinite;
                    opacity: 0.6;
                }

                @keyframes particles {
                    0% { transform: translate(0, 0); }
                    100% { transform: translate(-50%, -50%); }
                }

                /* Cyber grid effect */
                .intro-container::after {
                    content: '';
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    background-image: 
                        linear-gradient(rgba(0, 255, 136, 0.03) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0, 255, 136, 0.03) 1px, transparent 1px);
                    background-size: 50px 50px;
                    animation: gridScroll 20s linear infinite;
                    opacity: 0.5;
                }

                @keyframes gridScroll {
                    0% { transform: translate(0, 0); }
                    100% { transform: translate(50px, 50px); }
                }

                /* Loading section */
                .loading-section {
                    position: relative;
                    z-index: 1;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 2rem;
                    opacity: 1;
                    transition: opacity 0.5s ease;
                }

                .loading-section.hidden {
                    opacity: 0;
                    pointer-events: none;
                }

                .loading-text {
                    font-family: 'VT323', monospace;
                    font-size: 2rem;
                    color: #00ff88;
                    text-transform: uppercase;
                    letter-spacing: 4px;
                    text-shadow: 
                        0 0 10px rgba(0, 255, 136, 0.8),
                        0 0 20px rgba(0, 255, 136, 0.5),
                        0 0 30px rgba(0, 255, 136, 0.3);
                    animation: textGlow 2s ease-in-out infinite;
                }

                @keyframes textGlow {
                    0%, 100% {
                        text-shadow: 
                            0 0 10px rgba(0, 255, 136, 0.8),
                            0 0 20px rgba(0, 255, 136, 0.5),
                            0 0 30px rgba(0, 255, 136, 0.3);
                    }
                    50% {
                        text-shadow: 
                            0 0 20px rgba(0, 255, 136, 1),
                            0 0 30px rgba(0, 255, 136, 0.8),
                            0 0 40px rgba(0, 255, 136, 0.6);
                    }
                }

                /* Loading bar container */
                .loading-bar-container {
                    width: 500px;
                    max-width: 80vw;
                    height: 40px;
                    background: rgba(0, 0, 0, 0.5);
                    border: 2px solid rgba(0, 255, 136, 0.3);
                    border-radius: 4px;
                    padding: 4px;
                    position: relative;
                    box-shadow: 
                        0 0 20px rgba(0, 255, 136, 0.2),
                        inset 0 0 10px rgba(0, 0, 0, 0.5);
                }

                .loading-bar-container::before {
                    content: '';
                    position: absolute;
                    top: -2px;
                    left: -2px;
                    right: -2px;
                    bottom: -2px;
                    background: linear-gradient(90deg, 
                        transparent, 
                        rgba(0, 255, 136, 0.5), 
                        transparent);
                    border-radius: 4px;
                    animation: borderGlow 2s linear infinite;
                    z-index: -1;
                }

                @keyframes borderGlow {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }

                /* Loading bar fill */
                .loading-bar-fill {
                    height: 100%;
                    background: linear-gradient(90deg, 
                        #00ff88, 
                        #00d96e, 
                        #00ff88);
                    background-size: 200% 100%;
                    border-radius: 2px;
                    transition: width 0.3s ease;
                    position: relative;
                    box-shadow: 
                        0 0 20px rgba(0, 255, 136, 0.6),
                        inset 0 0 10px rgba(255, 255, 255, 0.3);
                    animation: barShine 1.5s linear infinite;
                }

                @keyframes barShine {
                    0% { background-position: 0% 50%; }
                    100% { background-position: 200% 50%; }
                }

                .loading-bar-fill::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: linear-gradient(180deg, 
                        rgba(255, 255, 255, 0.3) 0%, 
                        transparent 50%, 
                        rgba(0, 0, 0, 0.2) 100%);
                    border-radius: 2px;
                }

                /* Percentage text */
                .loading-percentage {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    font-family: 'VT323', monospace;
                    font-size: 1.5rem;
                    color: #ffffff;
                    font-weight: bold;
                    text-shadow: 
                        0 0 5px rgba(0, 0, 0, 0.8),
                        0 0 10px rgba(0, 255, 136, 0.5);
                    z-index: 2;
                }

                /* Logo section */
                .logo-section {
                    position: absolute;
                    z-index: 1;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    opacity: 0;
                    transform: scale(0.5) translateY(50px);
                    animation: logoPopIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
                }

                @keyframes logoPopIn {
                    0% {
                        opacity: 0;
                        transform: scale(0.5) translateY(50px) rotate(-10deg);
                    }
                    60% {
                        opacity: 1;
                        transform: scale(1.15) translateY(-10px) rotate(5deg);
                    }
                    100% {
                        opacity: 1;
                        transform: scale(1) translateY(0) rotate(0deg);
                    }
                }

                .logo-text {
                    font-family: 'VT323', monospace;
                    font-size: 8rem;
                    color: #00ff88;
                    text-transform: lowercase;
                    letter-spacing: -2px;
                    text-shadow: 
                        0 0 30px rgba(0, 255, 136, 0.8),
                        0 0 60px rgba(0, 255, 136, 0.5),
                        0 0 90px rgba(0, 255, 136, 0.3),
                        0 5px 10px rgba(0, 0, 0, 0.5);
                    animation: logoGlow 2s ease-in-out infinite;
                    position: relative;
                }

                @keyframes logoGlow {
                    0%, 100% {
                        text-shadow: 
                            0 0 30px rgba(0, 255, 136, 0.8),
                            0 0 60px rgba(0, 255, 136, 0.5),
                            0 0 90px rgba(0, 255, 136, 0.3),
                            0 5px 10px rgba(0, 0, 0, 0.5);
                    }
                    50% {
                        text-shadow: 
                            0 0 40px rgba(0, 255, 136, 1),
                            0 0 80px rgba(0, 255, 136, 0.8),
                            0 0 120px rgba(0, 255, 136, 0.6),
                            0 5px 15px rgba(0, 0, 0, 0.7);
                    }
                }

                /* Glitch effect on logo */
                .logo-text::before,
                .logo-text::after {
                    content: 'trackerbot.fun';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                }

                .logo-text::before {
                    animation: glitch1 0.3s infinite;
                    color: #ff00de;
                    z-index: -1;
                }

                .logo-text::after {
                    animation: glitch2 0.3s infinite;
                    color: #00fff9;
                    z-index: -2;
                }

                @keyframes glitch1 {
                    0% { transform: translate(0); }
                    20% { transform: translate(-2px, 2px); }
                    40% { transform: translate(-2px, -2px); }
                    60% { transform: translate(2px, 2px); }
                    80% { transform: translate(2px, -2px); }
                    100% { transform: translate(0); }
                }

                @keyframes glitch2 {
                    0% { transform: translate(0); }
                    20% { transform: translate(2px, -2px); }
                    40% { transform: translate(2px, 2px); }
                    60% { transform: translate(-2px, -2px); }
                    80% { transform: translate(-2px, 2px); }
                    100% { transform: translate(0); }
                }

                .logo-tagline {
                    font-family: 'VT323', monospace;
                    font-size: 1.8rem;
                    color: rgba(0, 255, 136, 0.8);
                    text-transform: uppercase;
                    letter-spacing: 8px;
                    margin-top: 1rem;
                    animation: taglineFade 1s ease-in 0.5s forwards;
                    opacity: 0;
                }

                @keyframes taglineFade {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                /* Responsive adjustments */
                @media (max-width: 768px) {
                    .loading-text {
                        font-size: 1.5rem;
                        letter-spacing: 2px;
                    }

                    .loading-bar-container {
                        width: 350px;
                        height: 30px;
                    }

                    .loading-percentage {
                        font-size: 1.2rem;
                    }

                    .logo-text {
                        font-size: 4rem;
                    }

                    .logo-tagline {
                        font-size: 1.2rem;
                        letter-spacing: 4px;
                    }
                }

                @media (max-width: 480px) {
                    .loading-text {
                        font-size: 1.2rem;
                    }

                    .loading-bar-container {
                        width: 280px;
                        height: 25px;
                    }

                    .logo-text {
                        font-size: 3rem;
                    }

                    .logo-tagline {
                        font-size: 1rem;
                        letter-spacing: 3px;
                    }
                }
            `}</style>

            {/* Loading Section */}
            <div className={`loading-section ${showLogo ? 'hidden' : ''}`}>
                <div className="loading-text">
                    Initializing System
                </div>
                <div className="loading-bar-container">
                    <div
                        className="loading-bar-fill"
                        style={{ width: `${Math.min(loadingProgress, 100)}%` }}
                    />
                    <div className="loading-percentage">
                        {Math.floor(Math.min(loadingProgress, 100))}%
                    </div>
                </div>
            </div>

            {/* Logo Section */}
            {showLogo && (
                <div className="logo-section">
                    <div className="logo-text">
                        trackerbot.fun
                    </div>
                    <div className="logo-tagline">
                        Reveal Degen Stories
                    </div>
                </div>
            )}
        </div>
    );
};

// Export the IntroAnimation component to use in your App
export default IntroAnimation;