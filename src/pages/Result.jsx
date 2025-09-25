import { useLocation } from 'react-router-dom';
import Navbar from '../components/NavBar';
import ResultStatCard from '../components/ResultStatCard';
import AnalysisCard from '../components/AnalysisCard';

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
                        />

                        <AnalysisCard
                            type="losses"
                            title="Biggest Losses"
                            headers={{ left: "Token", right: "Loss" }}
                            data={resultData.biggestLosses}
                        />

                        <AnalysisCard
                            type="fumbles"
                            title="Biggest Fumbles"
                            headers={{ left: "Token", right: "Value" }}
                            data={resultData.biggestFumbles}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Result;