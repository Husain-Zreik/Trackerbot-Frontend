import { useState, useRef, useEffect } from 'react';
import ShareModal from './ShareModal';

const AnalysisCard = ({ type, title, headers, data, walletAddress }) => {
    const [showScrollHint, setShowScrollHint] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
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

    const handleShareClick = (item, index) => {
        setModalData({ ...item, rank: index + 1 });
        setIsModalOpen(true);
    };

    const renderDataValue = (item, index) => {
        return (
            <div className="analysis-card__value-container">
                {type === 'wins' && <span className="analysis-card__profit">{item.profit}</span>}
                {type === 'losses' && <span className="analysis-card__loss">{item.loss}</span>}
                {type === 'fumbles' && <span className="analysis-card__value">{item.value}</span>}

                {walletAddress && (
                    <button
                        className="analysis-card__share-btn"
                        onClick={() => handleShareClick(item, index)}
                        title={`Share this ${type === 'wins' ? 'win' : type === 'losses' ? 'loss' : 'fumble'}`}
                    >
                        <svg className="analysis-card__share-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="18" cy="5" r="3"></circle>
                            <circle cx="6" cy="12" r="3"></circle>
                            <circle cx="18" cy="19" r="3"></circle>
                            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                        </svg>
                    </button>
                )}
            </div>
        );
    };

    return (
        <>
            <div className={`analysis-card analysis-card--${type}`}>
                <div className="analysis-card__header-container">
                    <h3 className="analysis-card__title">{title}</h3>
                </div>
                <div className="analysis-card__column-headers">
                    <span className="analysis-card__header-left">{headers.left}</span>
                    <span className="analysis-card__header-right">{headers.right}</span>
                </div>
                <div
                    className="analysis-card__content"
                    ref={contentRef}
                    onScroll={handleScroll}
                >
                    {data.map((item, index) => (
                        <div key={index} className="analysis-card__row">
                            <div className="analysis-card__row-left">
                                <span className="analysis-card__rank">#{index + 1}</span>
                                <span className="analysis-card__token">{item.token}</span>
                            </div>
                            {renderDataValue(item, index)}
                        </div>
                    ))}
                </div>
                {showScrollHint && (
                    <div className="analysis-card__scroll-hint">
                        <i className="fa-solid fa-chevron-down"></i>
                        <span>Scroll for more</span>
                    </div>
                )}
            </div>

            {walletAddress && (
                <ShareModal
                    isOpen={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false);
                        setModalData(null);
                    }}
                    data={modalData}
                    type={type}
                    walletAddress={walletAddress}
                />
            )}
        </>
    );
};

export default AnalysisCard;