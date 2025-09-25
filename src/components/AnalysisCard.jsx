import { useState, useRef, useEffect } from 'react';

const AnalysisCard = ({ type, title, headers, data, walletAddress }) => {
    const [showScrollHint, setShowScrollHint] = useState(false);
    const contentRef = useRef(null);

    useEffect(() => {
        // Check if content is scrollable
        if (contentRef.current) {
            const isScrollable = contentRef.current.scrollHeight > contentRef.current.clientHeight;
            setShowScrollHint(isScrollable);
        }
    }, [data]);

    const handleScroll = (e) => {
        const element = e.target;
        const isAtBottom = Math.abs(element.scrollHeight - element.scrollTop - element.clientHeight) < 1;

        // Hide scroll hint when user has scrolled to bottom
        if (isAtBottom) {
            setShowScrollHint(false);
        }
    };

    const renderDataValue = (item) => {
        switch (type) {
            case 'wins':
                return <span className="result__profit">{item.profit}</span>;
            case 'losses':
                return <span className="result__loss">{item.loss}</span>;
            case 'fumbles':
                return <span className="result__value">{item.value}</span>;
            default:
                return null;
        }
    };

    const handleShareToX = () => {
        const walletShort = walletAddress ?
            `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : 'Wallet';

        let shareText = '';
        const top5 = data.slice(0, 5);

        switch (type) {
            case 'wins':
                shareText = `🏆 ${title} for ${walletShort}\n\n`;
                top5.forEach((item, i) => {
                    shareText += `${i + 1}. ${item.token}: ${item.profit}\n`;
                });
                shareText += `\n💚 Check your wins at trackerbot.fun`;
                break;

            case 'losses':
                shareText = `📉 ${title} for ${walletShort}\n\n`;
                top5.forEach((item, i) => {
                    shareText += `${i + 1}. ${item.token}: ${item.loss}\n`;
                });
                shareText += `\n💔 Check your losses at trackerbot.fun`;
                break;

            case 'fumbles':
                shareText = `😭 ${title} for ${walletShort}\n\n`;
                top5.forEach((item, i) => {
                    shareText += `${i + 1}. ${item.token}: ${item.value}\n`;
                });
                shareText += `\n🤦 What could have been... trackerbot.fun`;
                break;
        }

        const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
        window.open(shareUrl, '_blank');
    };

    return (
        <div className={`result__analysis-card result__analysis-card--${type}`}>
            <div className="result__analysis-header-container">
                <h3 className="result__analysis-title">{title}</h3>
                <button
                    className="result__card-share-btn"
                    onClick={handleShareToX}
                    title={`Share ${title} on X`}
                >
                    <svg className="result__card-share-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                </button>
            </div>
            <div className="result__analysis-header">
                <span>{headers.left}</span>
                <span>{headers.right}</span>
            </div>
            <div
                className="result__analysis-content"
                ref={contentRef}
                onScroll={handleScroll}
            >
                {data.map((item, index) => (
                    <div key={index} className="result__analysis-row">
                        <div className="result__analysis-rank">#{index + 1}</div>
                        <span className="result__token">{item.token}</span>
                        {renderDataValue(item)}
                    </div>
                ))}
            </div>
            {showScrollHint && (
                <div className="result__scroll-hint">
                    <i className="fa-solid fa-chevron-down"></i>
                    <span>Scroll for more</span>
                </div>
            )}
        </div>
    );
};

export default AnalysisCard;