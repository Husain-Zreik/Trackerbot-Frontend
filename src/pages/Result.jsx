import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ResultStatCard from '../components/ResultStatCard';
import AnalysisCard from '../components/AnalysisCard';

const Result = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const urlParams = new URLSearchParams(location.search);

    // Parse multiple wallets
    const walletsParam = urlParams.get('wallets') || urlParams.get('wallet');
    const walletList = walletsParam ? walletsParam.split(',').map(w => w.trim()) : [];

    // State for current wallet being viewed
    const [currentWalletIndex, setCurrentWalletIndex] = useState(0);
    const currentWallet = walletList[currentWalletIndex] || walletList[0];

    const handleBackToHome = () => {
        navigate('/');
    };

    const handleNewSearch = () => {
        navigate('/');
    };

    const handleWalletSwitch = (index) => {
        setCurrentWalletIndex(index);
    };

    // Extended dummy data for scrolling demonstration
    const resultData = {
        stats: [
            { label: "Current Balance", value: "$45,234" },
            { label: "Total PNL", value: "+$12,456" },
            { label: "Total Trades", value: "1,234" }
        ],
        biggestWins: [
            { token: "$BONK", profit: "+$14,500" },
            { token: "$PEPE", profit: "+$12,800" },
            { token: "$WIF", profit: "+$12,200" },
            { token: "$SHIB", profit: "+$10,400" },
            { token: "$DOGE", profit: "+$8,200" },
            { token: "$FLOKI", profit: "+$7,800" },
            { token: "$MEME", profit: "+$6,900" },
            { token: "$WOJAK", profit: "+$6,500" },
            { token: "$TURBO", profit: "+$5,800" },
            { token: "$BOB", profit: "+$5,200" },
            { token: "$LADYS", profit: "+$4,800" },
            { token: "$PEPE2", profit: "+$4,500" },
            { token: "$SPONGE", profit: "+$4,200" },
            { token: "$SIMPSON", profit: "+$3,900" },
            { token: "$JEFF", profit: "+$3,600" },
            { token: "$PEPEC", profit: "+$3,300" },
            { token: "$BOBO", profit: "+$3,000" },
            { token: "$WAGMI", profit: "+$2,700" },
            { token: "$PSYOP", profit: "+$2,400" },
            { token: "$REFUND", profit: "+$2,100" }
        ],
        biggestLosses: [
            { token: "$LUNA", loss: "-$18,400" },
            { token: "$FTT", loss: "-$16,200" },
            { token: "$CELSIUS", loss: "-$12,600" },
            { token: "$SQUID", loss: "-$10,400" },
            { token: "$TITAN", loss: "-$8,200" },
            { token: "$IRON", loss: "-$7,100" },
            { token: "$BUNNY", loss: "-$6,500" },
            { token: "$MARK", loss: "-$5,900" },
            { token: "$BASED", loss: "-$5,300" },
            { token: "$HOTDOG", loss: "-$4,700" },
            { token: "$PICKLE", loss: "-$4,200" },
            { token: "$KIMCHI", loss: "-$3,800" },
            { token: "$SUSHI", loss: "-$3,400" },
            { token: "$CAKE", loss: "-$3,000" },
            { token: "$BURGER", loss: "-$2,600" },
            { token: "$PIZZA", loss: "-$2,300" },
            { token: "$TACO", loss: "-$2,000" },
            { token: "$DONUT", loss: "-$1,700" },
            { token: "$CREAM", loss: "-$1,400" },
            { token: "$PASTA", loss: "-$1,100" }
        ],
        biggestFumbles: [
            { token: "$BTC", value: "$868,400" },
            { token: "$ETH", value: "$649,200" },
            { token: "$SOL", value: "$267,600" },
            { token: "$AVAX", value: "$250,400" },
            { token: "$MATIC", value: "$177,200" },
            { token: "$ADA", value: "$156,800" },
            { token: "$DOT", value: "$134,500" },
            { token: "$LINK", value: "$112,300" },
            { token: "$UNI", value: "$98,700" },
            { token: "$ATOM", value: "$87,400" },
            { token: "$FTM", value: "$76,200" },
            { token: "$NEAR", value: "$65,800" },
            { token: "$ALGO", value: "$54,300" },
            { token: "$VET", value: "$43,200" },
            { token: "$SAND", value: "$32,100" },
            { token: "$MANA", value: "$28,900" },
            { token: "$AXS", value: "$24,600" },
            { token: "$GALA", value: "$21,300" },
            { token: "$ENJ", value: "$18,700" },
            { token: "$CHZ", value: "$15,400" }
        ]
    };

    return (
        <div className="result">
            <main className="main">
                {/* Wallet Selector if multiple wallets */}
                {walletList.length > 1 && (
                    <div className="result__wallet-selector">
                        <div className="result__wallet-tabs">
                            {walletList.map((wallet, index) => (
                                <button
                                    key={index}
                                    className={`result__wallet-tab ${index === currentWalletIndex ? 'result__wallet-tab--active' : ''}`}
                                    onClick={() => handleWalletSwitch(index)}
                                >
                                    <i className="fa-solid fa-wallet"></i>
                                    <span>
                                        {wallet.length > 20
                                            ? `${wallet.slice(0, 6)}...${wallet.slice(-4)}`
                                            : wallet
                                        }
                                    </span>
                                    {index === currentWalletIndex && (
                                        <span className="result__wallet-tab-indicator"></span>
                                    )}
                                </button>
                            ))}
                        </div>
                        <div className="result__wallet-nav">
                            <button
                                className="result__wallet-nav-btn"
                                disabled={currentWalletIndex === 0}
                                onClick={() => setCurrentWalletIndex(currentWalletIndex - 1)}
                            >
                                <i className="fa-solid fa-chevron-left"></i>
                            </button>
                            <span className="result__wallet-counter">
                                {currentWalletIndex + 1} / {walletList.length}
                            </span>
                            <button
                                className="result__wallet-nav-btn"
                                disabled={currentWalletIndex === walletList.length - 1}
                                onClick={() => setCurrentWalletIndex(currentWalletIndex + 1)}
                            >
                                <i className="fa-solid fa-chevron-right"></i>
                            </button>
                        </div>
                    </div>
                )}

                {/* Current Wallet Display */}
                {currentWallet && (
                    <div className="result__current-wallet">
                        <div className="result__current-wallet-badge">
                            <i className="fa-solid fa-wallet"></i>
                            <span>{currentWallet.length > 20
                                ? `${currentWallet.slice(0, 6)}...${currentWallet.slice(-4)}`
                                : currentWallet
                            }</span>
                        </div>
                    </div>
                )}

                {/* Top Stats Row */}
                <div className="result__stats">
                    <div className="result__stats-grid">
                        {resultData.stats.map((stat, index) => (
                            <ResultStatCard
                                key={index}
                                label={stat.label}
                                value={stat.value}
                            />
                        ))}
                    </div>
                </div>

                {/* Bottom Analysis Row */}
                <div className="result__analysis">
                    <div className="result__analysis-grid">
                        <AnalysisCard
                            type="wins"
                            title="Biggest Wins"
                            headers={{ left: "Token", right: "Profit" }}
                            data={resultData.biggestWins}
                            walletAddress={currentWallet}
                        />

                        <AnalysisCard
                            type="losses"
                            title="Biggest Losses"
                            headers={{ left: "Token", right: "Loss" }}
                            data={resultData.biggestLosses}
                            walletAddress={currentWallet}
                        />

                        <AnalysisCard
                            type="fumbles"
                            title="Biggest Fumbles"
                            headers={{ left: "Token", right: "Value" }}
                            data={resultData.biggestFumbles}
                            walletAddress={currentWallet}
                        />
                    </div>
                </div>

                {/* Navigation Controls */}
                <div className="result__controls">
                    <button
                        className="result__new-search-btn"
                        onClick={handleNewSearch}
                        title="New search"
                    >
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <span>New Search</span>
                    </button>
                </div>
            </main>
        </div>
    );
};

export default Result;