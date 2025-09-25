import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";
import StatsCard from "../components/StatCard";

const Home = () => {
    const [searchValue, setSearchValue] = useState("");
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchValue.trim()) {
            navigate(`/result?wallet=${encodeURIComponent(searchValue)}`);
        }
    };

    return (
        <div className="homepage">
            <main className="main">
                <div className="hero">
                    <div className="hero__title">trackerbot.fun</div>
                    <div className="hero__subtitle">Paste a wallet.</div>
                    <div className="hero__subtitle">Reveal the degen story.</div>

                    <form onSubmit={handleSearch} className="search">
                        <div className="search__container">
                            <i className="search__icon fa-solid fa-xl fa-magnifying-glass"></i>
                            <input
                                type="text"
                                className="search__input"
                                placeholder=""
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                            />
                        </div>
                    </form>
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