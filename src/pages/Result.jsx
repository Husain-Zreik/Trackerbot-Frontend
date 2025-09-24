import { useLocation } from 'react-router-dom';
import Navbar from '../components/NavBar';

const Result = () => {
    const location = useLocation();
    const urlParams = new URLSearchParams(location.search);
    const wallet = urlParams.get('wallet');

    // Dummy data for the result page
    const resultData = {
        stats: [
            { label: "Current Balance", value: "$45,234" },
            { label: "Total PNL", value: "+$12,456" },
            { label: "Total Trades", value: "1,234" }
        ],
        biggestWins: [
            { token: "$BONK", profit: "+$14,500" },
            { token: "", profit: "+$12,800" },
            { token: "", profit: "+$12,200" },
            { token: "", profit: "+$10,400" },
            { token: "", profit: "+$8,200" }
        ],
        biggestLosses: [
            { token: "", loss: "-$8,400" },
            { token: "", loss: "-$6,200" },
            { token: "", loss: "-$2,600" },
            { token: "", loss: "-$2,400" },
            { token: "", loss: "-$1,200" }
        ],
        biggestFumbles: [
            { token: "", value: "$868,400" },
            { token: "", value: "$649,200" },
            { token: "", value: "$267,600" },
            { token: "", value: "$250,400" },
            { token: "", value: "$177,200" }
        ]
    };

    return (
        <div className="result">
            <Navbar />

            <main className="main">
                {/* Top Stats Row */}
                <div className="result__stats">
                    <div className="result__stats-grid">
                        {resultData.stats.map((stat, index) => (
                            <div key={index} className="result__stat-card">
                                <h3 className="result__stat-title">{stat.label}</h3>
                                <div className="result__stat-value">{stat.value}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Analysis Row */}
                <div className="result__analysis">
                    <div className="result__analysis-grid">
                        {/* Biggest Wins */}
                        <div className="result__analysis-card result__analysis-card--wins">
                            <h3 className="result__analysis-title">Biggest Wins</h3>
                            <div className="result__analysis-header">
                                <span>Token</span>
                                <span>Profit</span>
                            </div>
                            <div className="result__analysis-content">
                                {resultData.biggestWins.map((item, index) => (
                                    <div key={index} className="result__analysis-row">
                                        <span className="result__token">{item.token}</span>
                                        <span className="result__profit">{item.profit}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Biggest Losses */}
                        <div className="result__analysis-card result__analysis-card--losses">
                            <h3 className="result__analysis-title">Biggest Losses</h3>
                            <div className="result__analysis-header">
                                <span>Token</span>
                                <span>Loss</span>
                            </div>
                            <div className="result__analysis-content">
                                {resultData.biggestLosses.map((item, index) => (
                                    <div key={index} className="result__analysis-row">
                                        <span className="result__token">{item.token}</span>
                                        <span className="result__loss">{item.loss}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Biggest Fumbles */}
                        <div className="result__analysis-card result__analysis-card--fumbles">
                            <h3 className="result__analysis-title">Biggest Fumbles</h3>
                            <div className="result__analysis-header">
                                <span>Token</span>
                                <span>Value</span>
                            </div>
                            <div className="result__analysis-content">
                                {resultData.biggestFumbles.map((item, index) => (
                                    <div key={index} className="result__analysis-row">
                                        <span className="result__token">{item.token}</span>
                                        <span className="result__value">{item.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Result;