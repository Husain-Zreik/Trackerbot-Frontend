// src/components/IntroAnimation.jsx
import { useState, useEffect, useRef } from 'react';

const IntroAnimation = ({ onComplete }) => {
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [showLogo, setShowLogo] = useState(false);
    const [fadeOut, setFadeOut] = useState(false);
    const canvasRef = useRef(null);
    const particlesRef = useRef([]);
    const animationFrameRef = useRef(null);

    // Particle system
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Particle class
        class Particle {
            constructor() {
                this.reset();
                this.y = Math.random() * canvas.height;
                this.opacity = Math.random();
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 3 + 1;
                this.speedX = Math.random() * 0.5 - 0.25;
                this.speedY = Math.random() * 0.5 - 0.25;
                this.opacity = Math.random() * 0.5 + 0.3;
                this.pulseSpeed = Math.random() * 0.02 + 0.01;
                this.pulsePhase = Math.random() * Math.PI * 2;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.pulsePhase += this.pulseSpeed;

                // Pulsing effect
                const pulse = Math.sin(this.pulsePhase) * 0.3 + 0.7;
                this.currentOpacity = this.opacity * pulse;

                // Wrap around screen
                if (this.x < 0) this.x = canvas.width;
                if (this.x > canvas.width) this.x = 0;
                if (this.y < 0) this.y = canvas.height;
                if (this.y > canvas.height) this.y = 0;
            }

            draw() {
                ctx.fillStyle = `rgba(0, 255, 136, ${this.currentOpacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();

                // Glow effect
                ctx.shadowBlur = 15;
                ctx.shadowColor = 'rgba(0, 255, 136, 0.8)';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.shadowBlur = 0;
            }
        }

        // Create particles
        const particleCount = 150;
        particlesRef.current = [];
        for (let i = 0; i < particleCount; i++) {
            particlesRef.current.push(new Particle());
        }

        // Connect nearby particles
        const connectParticles = () => {
            const maxDistance = 120;
            for (let i = 0; i < particlesRef.current.length; i++) {
                for (let j = i + 1; j < particlesRef.current.length; j++) {
                    const dx = particlesRef.current[i].x - particlesRef.current[j].x;
                    const dy = particlesRef.current[i].y - particlesRef.current[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < maxDistance) {
                        const opacity = (1 - distance / maxDistance) * 0.15;
                        ctx.strokeStyle = `rgba(0, 255, 136, ${opacity})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particlesRef.current[i].x, particlesRef.current[i].y);
                        ctx.lineTo(particlesRef.current[j].x, particlesRef.current[j].y);
                        ctx.stroke();
                    }
                }
            }
        };

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw grid
            ctx.strokeStyle = 'rgba(0, 255, 136, 0.03)';
            ctx.lineWidth = 1;
            const gridSize = 50;
            for (let x = 0; x < canvas.width; x += gridSize) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, canvas.height);
                ctx.stroke();
            }
            for (let y = 0; y < canvas.height; y += gridSize) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(canvas.width, y);
                ctx.stroke();
            }

            // Update and draw particles
            particlesRef.current.forEach(particle => {
                particle.update();
                particle.draw();
            });

            // Connect particles
            connectParticles();

            animationFrameRef.current = requestAnimationFrame(animate);
        };

        animate();

        // Handle resize
        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, []);

    useEffect(() => {
        // Loading bar animation
        const interval = setInterval(() => {
            setLoadingProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setShowLogo(true), 300);
                    return 100;
                }
                return prev + Math.random() * 8 + 2;
            });
        }, 80);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (showLogo) {
            setTimeout(() => {
                setFadeOut(true);
                setTimeout(() => onComplete?.(), 800);
            }, 2500);
        }
    }, [showLogo, onComplete]);

    return (
        <div className={`intro ${fadeOut ? 'intro--fade-out' : ''}`}>
            <canvas ref={canvasRef} className="intro__canvas" />

            {/* Loading Section */}
            <div className={`intro__loading ${showLogo ? 'intro__loading--hidden' : ''}`}>
                <div className="intro__loading-text">
                    Initializing System
                </div>
                <div className="intro__loading-bar-container">
                    <div
                        className="intro__loading-bar-fill"
                        style={{ width: `${Math.min(loadingProgress, 100)}%` }}
                    />
                    <div className="intro__loading-percentage">
                        {Math.floor(Math.min(loadingProgress, 100))}%
                    </div>
                </div>
            </div>

            {/* Logo Section */}
            {showLogo && (
                <div className="intro__logo">
                    <div className="intro__logo-text">
                        trackerbot.fun
                    </div>
                    <div className="intro__logo-tagline">
                        Reveal Degen Stories
                    </div>
                </div>
            )}
        </div>
    );
};

export default IntroAnimation;