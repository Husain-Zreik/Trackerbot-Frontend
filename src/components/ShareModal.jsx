import { useEffect, useRef, useState } from 'react';

const ShareModal = ({ isOpen, onClose, data, type, walletAddress }) => {
    const canvasRef = useRef(null);
    const [imageUrl, setImageUrl] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    useEffect(() => {
        if (isOpen && data) {
            generateImage();
        }
    }, [isOpen, data]);

    const generateImage = () => {
        setIsGenerating(true);
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        canvas.width = 800;
        canvas.height = 500;

        // Dark background
        ctx.fillStyle = '#0a0b0f';
        ctx.fillRect(0, 0, 800, 500);

        // Create gradient card background
        const cardX = 100;
        const cardY = 50;
        const cardWidth = 600;
        const cardHeight = 400;
        const borderRadius = 30;

        // Draw rounded rectangle path
        const drawRoundedRect = (x, y, w, h, r) => {
            ctx.beginPath();
            ctx.moveTo(x + r, y);
            ctx.lineTo(x + w - r, y);
            ctx.quadraticCurveTo(x + w, y, x + w, y + r);
            ctx.lineTo(x + w, y + h - r);
            ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
            ctx.lineTo(x + r, y + h);
            ctx.quadraticCurveTo(x, y + h, x, y + h - r);
            ctx.lineTo(x, y + r);
            ctx.quadraticCurveTo(x, y, x + r, y);
            ctx.closePath();
        };

        // Save context for clipping
        ctx.save();
        drawRoundedRect(cardX, cardY, cardWidth, cardHeight, borderRadius);
        ctx.clip();

        // Create main gradient based on type
        const cardGradient = ctx.createLinearGradient(cardX, cardY, cardX + cardWidth, cardY + cardHeight);

        if (type === 'wins') {
            // Green gradient for wins
            cardGradient.addColorStop(0, '#00ff88');
            cardGradient.addColorStop(0.5, '#00b860');
            cardGradient.addColorStop(1, '#006633');
        } else if (type === 'losses') {
            // Red gradient for losses
            cardGradient.addColorStop(0, '#ff4757');
            cardGradient.addColorStop(0.5, '#e03344');
            cardGradient.addColorStop(1, '#991122');
        } else {
            // Purple gradient for fumbles
            cardGradient.addColorStop(0, '#b565f3');
            cardGradient.addColorStop(0.5, '#8b4fc7');
            cardGradient.addColorStop(1, '#6633aa');
        }

        // Fill with gradient
        ctx.fillStyle = cardGradient;
        ctx.fillRect(cardX, cardY, cardWidth, cardHeight);

        // Add glass effect overlay
        const glassGradient = ctx.createLinearGradient(cardX, cardY, cardX, cardY + cardHeight);
        glassGradient.addColorStop(0, 'rgba(255, 255, 255, 0.15)');
        glassGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.05)');
        glassGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = glassGradient;
        ctx.fillRect(cardX, cardY, cardWidth, cardHeight);

        // Add dark overlay for better text contrast
        const darkOverlay = ctx.createLinearGradient(cardX, cardY, cardX, cardY + cardHeight);
        darkOverlay.addColorStop(0, 'rgba(0, 0, 0, 0.3)');
        darkOverlay.addColorStop(0.3, 'rgba(0, 0, 0, 0.5)');
        darkOverlay.addColorStop(1, 'rgba(0, 0, 0, 0.7)');
        ctx.fillStyle = darkOverlay;
        ctx.fillRect(cardX, cardY, cardWidth, cardHeight);

        ctx.restore();

        // Add decorative blobs (similar to Photon design)
        // Top left blob
        const blob1Gradient = ctx.createRadialGradient(120, 70, 0, 120, 70, 80);
        if (type === 'wins') {
            blob1Gradient.addColorStop(0, 'rgba(0, 255, 136, 0.6)');
            blob1Gradient.addColorStop(1, 'rgba(0, 255, 136, 0)');
        } else if (type === 'losses') {
            blob1Gradient.addColorStop(0, 'rgba(255, 71, 87, 0.6)');
            blob1Gradient.addColorStop(1, 'rgba(255, 71, 87, 0)');
        } else {
            blob1Gradient.addColorStop(0, 'rgba(181, 101, 243, 0.6)');
            blob1Gradient.addColorStop(1, 'rgba(181, 101, 243, 0)');
        }
        ctx.fillStyle = blob1Gradient;
        ctx.fillRect(40, 0, 160, 160);

        // Bottom right blob
        const blob2Gradient = ctx.createRadialGradient(680, 430, 0, 680, 430, 100);
        if (type === 'wins') {
            blob2Gradient.addColorStop(0, 'rgba(0, 184, 96, 0.6)');
            blob2Gradient.addColorStop(1, 'rgba(0, 184, 96, 0)');
        } else if (type === 'losses') {
            blob2Gradient.addColorStop(0, 'rgba(224, 51, 68, 0.6)');
            blob2Gradient.addColorStop(1, 'rgba(224, 51, 68, 0)');
        } else {
            blob2Gradient.addColorStop(0, 'rgba(139, 79, 199, 0.6)');
            blob2Gradient.addColorStop(1, 'rgba(139, 79, 199, 0)');
        }
        ctx.fillStyle = blob2Gradient;
        ctx.fillRect(580, 340, 200, 200);

        // Add text content
        ctx.save();
        drawRoundedRect(cardX, cardY, cardWidth, cardHeight, borderRadius);
        ctx.clip();

        // Title section
        const titleText = type === 'wins' ? 'GAINS WITH' : type === 'losses' ? 'LOSSES WITH' : 'FUMBLED';
        ctx.font = '600 24px "Inter", "Segoe UI", sans-serif';
        ctx.textAlign = 'left';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.fillText(titleText, cardX + 50, cardY + 60);

        // Token name (large)
        ctx.font = '700 52px "Inter", "Segoe UI", sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(data.token, cardX + 50, cardY + 120);

        // Rank badge
        ctx.font = '600 18px "Inter", "Segoe UI", sans-serif';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        const rankX = cardX + cardWidth - 100;
        ctx.textAlign = 'center';

        // Draw rank background
        const rankBgGradient = ctx.createLinearGradient(rankX - 40, cardY + 40, rankX + 40, cardY + 80);
        rankBgGradient.addColorStop(0, 'rgba(255, 255, 255, 0.15)');
        rankBgGradient.addColorStop(1, 'rgba(255, 255, 255, 0.05)');
        ctx.fillStyle = rankBgGradient;
        drawRoundedRect(rankX - 40, cardY + 40, 80, 40, 20);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.font = '700 20px "Inter", "Segoe UI", sans-serif';
        ctx.fillText(`#${data.rank}`, rankX, cardY + 65);

        // Stats section with labels
        ctx.textAlign = 'left';

        // Investment/Original label
        ctx.font = '500 16px "Inter", "Segoe UI", sans-serif';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        const labelY = cardY + 200;
        ctx.fillText(type === 'fumbles' ? 'SOLD AT' : 'INVESTED', cardX + 50, labelY);

        // Current/Result label
        ctx.fillText(type === 'fumbles' ? 'YOU COULD\'VE MADE' : type === 'wins' ? 'CURRENT VALUE' : 'CURRENT VALUE',
            cardX + 350, labelY);

        // Wallet address with icon
        const shortWallet = walletAddress ?
            `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : 'Wallet';

        // Draw wallet icon (simplified)
        ctx.font = '500 14px "Inter", "Segoe UI", sans-serif';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.fillText(`📍 ${shortWallet}`, cardX + 50, cardY + 160);

        // Values section - simulated SOL values
        ctx.font = '700 32px "Inter", "Segoe UI", sans-serif';

        // Generate realistic SOL values based on profit/loss
        const getValue = () => {
            const cleanValue = (type === 'wins' ? data.profit : type === 'losses' ? data.loss : data.value)
                .replace(/[^0-9.-]/g, '');
            const numValue = Math.abs(parseFloat(cleanValue)) || 0;
            return numValue;
        };

        const value = getValue();
        let investedSOL, currentSOL;

        if (type === 'wins') {
            investedSOL = (value / 10.31 * 0.0224).toFixed(4); // Simulated calculation
            currentSOL = (value / 10.31 * 0.0247).toFixed(4);
        } else if (type === 'losses') {
            currentSOL = (value * 0.0001).toFixed(4);
            investedSOL = ((parseFloat(currentSOL) + value / 1000)).toFixed(4);
        } else {
            investedSOL = (value * 0.001).toFixed(4);
            currentSOL = (value * 0.01).toFixed(4);
        }

        // SOL symbol styling
        ctx.fillStyle = '#00ffc8';
        ctx.font = '700 28px "Inter", "Segoe UI", sans-serif';
        ctx.fillText('◎', cardX + 50, labelY + 45);
        ctx.fillText('◎', cardX + 350, labelY + 45);

        // Values
        ctx.fillStyle = '#ffffff';
        ctx.font = '700 32px "Inter", "Segoe UI", sans-serif';
        ctx.fillText(investedSOL, cardX + 80, labelY + 45);
        ctx.fillText(currentSOL, cardX + 380, labelY + 45);

        // USD values
        ctx.font = '400 14px "Inter", "Segoe UI", sans-serif';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.fillText(type === 'fumbles' ? `Sold: ${data.value}` :
            type === 'wins' ? `+${data.profit}` :
                `${data.loss}`, cardX + 50, labelY + 70);

        // Percentage change (big and bold)
        ctx.font = '800 56px "Inter", "Segoe UI", sans-serif';
        const percentage = type === 'wins' ? '+10.31%' : type === 'losses' ? '-89.45%' : '+842.31%';

        if (type === 'wins') {
            ctx.fillStyle = '#00ff88';
        } else if (type === 'losses') {
            ctx.fillStyle = '#ff4757';
        } else {
            ctx.fillStyle = '#ffd700';
        }
        ctx.fillText(percentage, cardX + 50, cardY + 350);

        ctx.restore();

        // Footer branding
        ctx.textAlign = 'center';

        // TrackerBot text in VT323
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.font = '700 28px "VT323", monospace';
        ctx.fillText('TRACKERBOT.FUN', 400, 480);

        // Convert to image
        setImageUrl(canvas.toDataURL('image/png'));
        setIsGenerating(false);
    };

    const handleShareToX = () => {
        if (!data) return;

        const walletShort = walletAddress ?
            `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : 'Wallet';

        let shareText = '';
        if (type === 'wins') {
            shareText = `🏆 Rank #${data.rank} Win for ${walletShort}\n${data.token}: ${data.profit}\n\nTrack your wins at trackerbot.fun`;
        } else if (type === 'losses') {
            shareText = `📉 Rank #${data.rank} Loss for ${walletShort}\n${data.token}: ${data.loss}\n\nCheck your losses at trackerbot.fun`;
        } else {
            shareText = `😭 Rank #${data.rank} Fumble for ${walletShort}\n${data.token}: ${data.value}\n\nWhat could have been... trackerbot.fun`;
        }

        const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
        window.open(shareUrl, '_blank');
    };

    const handleDownloadImage = () => {
        const link = document.createElement('a');
        link.download = `trackerbot-${type}-${data.rank}.png`;
        link.href = imageUrl;
        link.click();
    };

    if (!isOpen) return null;

    return (
        <div className="share-modal" onClick={onClose}>
            <div className="share-modal__content" onClick={(e) => e.stopPropagation()}>
                <button className="share-modal__close" onClick={onClose}>
                    <i className="fa-solid fa-times"></i>
                </button>

                <h2 className="share-modal__title">Share Your {type === 'wins' ? 'Win' : type === 'losses' ? 'Loss' : 'Fumble'}</h2>

                <div className="share-modal__preview">
                    <canvas
                        ref={canvasRef}
                        className="share-modal__canvas"
                        style={{ display: 'none' }}
                    />
                    {isGenerating ? (
                        <div className="share-modal__loading">Generating image...</div>
                    ) : imageUrl && (
                        <img
                            src={imageUrl}
                            alt="Share preview"
                            className="share-modal__image"
                        />
                    )}
                </div>

                <div className="share-modal__actions">
                    <button
                        className="share-modal__btn share-modal__btn--x"
                        onClick={handleShareToX}
                    >
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                        Share on X
                    </button>
                    <button
                        className="share-modal__btn share-modal__btn--download"
                        onClick={handleDownloadImage}
                    >
                        <i className="fa-solid fa-download"></i>
                        Download Image
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ShareModal;