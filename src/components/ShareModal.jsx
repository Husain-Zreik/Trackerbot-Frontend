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

        // Background gradient based on type
        const gradient = ctx.createLinearGradient(0, 0, 800, 500);

        if (type === 'wins') {
            gradient.addColorStop(0, '#0a2f1f');
            gradient.addColorStop(1, '#051a10');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, 800, 500);

            // Add glow effect
            ctx.shadowColor = '#00ff88';
            ctx.shadowBlur = 100;
            ctx.fillStyle = '#0a3520';
            ctx.fillRect(50, 50, 700, 400);
            ctx.shadowBlur = 0;
        } else if (type === 'losses') {
            gradient.addColorStop(0, '#2f0a0a');
            gradient.addColorStop(1, '#1a0505');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, 800, 500);

            ctx.shadowColor = '#ff4757';
            ctx.shadowBlur = 100;
            ctx.fillStyle = '#350a0a';
            ctx.fillRect(50, 50, 700, 400);
            ctx.shadowBlur = 0;
        } else {
            gradient.addColorStop(0, '#1f0a2f');
            gradient.addColorStop(1, '#10051a');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, 800, 500);

            ctx.shadowColor = '#a55eea';
            ctx.shadowBlur = 100;
            ctx.fillStyle = '#200a35';
            ctx.fillRect(50, 50, 700, 400);
            ctx.shadowBlur = 0;
        }

        // Add grid pattern
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
        ctx.lineWidth = 1;
        for (let i = 0; i < 800; i += 40) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, 500);
            ctx.stroke();
        }
        for (let i = 0; i < 500; i += 40) {
            ctx.beginPath();
            ctx.moveTo(0, i);
            ctx.lineTo(800, i);
            ctx.stroke();
        }

        // Title
        ctx.font = 'bold 28px "Courier New", monospace';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#ffffff';
        ctx.fillText('trackerbot.fun', 400, 80);

        // Wallet address
        const shortWallet = walletAddress ?
            `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : 'Wallet';
        ctx.font = '18px "Courier New", monospace';
        ctx.fillStyle = '#8b949e';
        ctx.fillText(shortWallet, 400, 110);

        // Rank and token info
        ctx.font = 'bold 72px "Courier New", monospace';
        if (type === 'wins') {
            ctx.fillStyle = '#00ff88';
            ctx.shadowColor = '#00ff88';
            ctx.shadowBlur = 20;
        } else if (type === 'losses') {
            ctx.fillStyle = '#ff4757';
            ctx.shadowColor = '#ff4757';
            ctx.shadowBlur = 20;
        } else {
            ctx.fillStyle = '#a55eea';
            ctx.shadowColor = '#a55eea';
            ctx.shadowBlur = 20;
        }
        ctx.fillText(`#${data.rank}`, 400, 220);
        ctx.shadowBlur = 0;

        // Token name
        ctx.font = 'bold 48px "Courier New", monospace';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(data.token, 400, 290);

        // Value
        ctx.font = 'bold 56px "Courier New", monospace';
        if (type === 'wins') {
            ctx.fillStyle = '#00ff88';
            ctx.fillText(data.profit, 400, 370);

            ctx.font = '20px "Courier New", monospace';
            ctx.fillStyle = '#00ff88';
            ctx.fillText('PROFIT', 400, 400);
        } else if (type === 'losses') {
            ctx.fillStyle = '#ff4757';
            ctx.fillText(data.loss, 400, 370);

            ctx.font = '20px "Courier New", monospace';
            ctx.fillStyle = '#ff4757';
            ctx.fillText('LOSS', 400, 400);
        } else {
            ctx.fillStyle = '#a55eea';
            ctx.fillText(data.value, 400, 370);

            ctx.font = '20px "Courier New", monospace';
            ctx.fillStyle = '#a55eea';
            ctx.fillText('FUMBLED', 400, 400);
        }

        // Footer
        ctx.font = '16px "Courier New", monospace';
        ctx.fillStyle = '#8b949e';
        ctx.fillText('Track your crypto journey', 400, 460);

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