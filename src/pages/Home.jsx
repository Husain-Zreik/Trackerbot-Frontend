import SearchBar from "../components/SearchBar";
import StatsCard from "../components/StatCard";

const Home = () => {
    return (
        <div className="homepage">
            <main className="main">
                <div className="hero">
                    <div className="hero__title">trackerbot.fun</div>
                    <div className="hero__subtitle">Paste wallets.</div>
                    <div className="hero__subtitle">Reveal degen stories.</div>

                    <SearchBar />
                </div>

                <div className="stats">
                    <div className="stats__flex">
                        <StatsCard type="win" title="Biggest Win in 24h">
                            {/* Empty for now - can add data later */}
                        </StatsCard>

                        <StatsCard type="loss" title="Biggest Loss in 24h">
                            {/* Empty for now - can add data later */}
                        </StatsCard>

                        <StatsCard type="fumble" title="Biggest Fumble in 24h">
                            {/* Empty for now - can add data later */}
                        </StatsCard>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Home;