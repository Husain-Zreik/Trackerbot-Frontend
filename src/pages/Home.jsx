import SearchBar from "../components/SearchBar";
import AnalysisCard from "../components/AnalysisCard";

const Home = () => {
    // Sample data for the 24h cards - showing top 5 of each
    const sampleWins = [
        { token: "$BONK", profit: "+$14,500" },
        { token: "$PEPE", profit: "+$12,800" },
        { token: "$WIF", profit: "+$12,200" },
        { token: "$SHIB", profit: "+$10,400" },
        { token: "$DOGE", profit: "+$8,200" }
    ];

    const sampleLosses = [
        { token: "$LUNA", loss: "-$18,400" },
        { token: "$FTT", loss: "-$16,200" },
        { token: "$CELSIUS", loss: "-$12,600" },
        { token: "$SQUID", loss: "-$10,400" },
        { token: "$TITAN", loss: "-$8,200" }
    ];

    const sampleFumbles = [
        { token: "$BTC", value: "$868,400" },
        { token: "$ETH", value: "$649,200" },
        { token: "$SOL", value: "$267,600" },
        { token: "$AVAX", value: "$250,400" },
        { token: "$MATIC", value: "$177,200" }
    ];

    return (
        <div className="homepage">
            <main className="main">
                <div className="hero">
                    <div className="hero__title">trackerbot.fun</div>
                    <div className="hero__subtitle">Track. Analyze. Win.</div>

                    <SearchBar />
                </div>

                <div className="stats">
                    <div className="stats__section-title">
                        <h2>Top Movers in 24h</h2>
                        <div className="stats__section-divider"></div>
                    </div>

                    <div className="stats__grid">
                        <AnalysisCard
                            type="wins"
                            title="Biggest Wins"
                            headers={{ left: "Token", right: "Profit" }}
                            data={sampleWins}
                            walletAddress={null}
                        />

                        <AnalysisCard
                            type="losses"
                            title="Biggest Losses"
                            headers={{ left: "Token", right: "Loss" }}
                            data={sampleLosses}
                            walletAddress={null}
                        />

                        <AnalysisCard
                            type="fumbles"
                            title="Biggest Fumbles"
                            headers={{ left: "Token", right: "Value" }}
                            data={sampleFumbles}
                            walletAddress={null}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Home;