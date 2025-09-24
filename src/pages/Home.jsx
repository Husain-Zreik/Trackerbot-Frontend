import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";

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
            <Navbar />

            <main className="main">
                <div className="hero">
                    <div className="hero__title">trackerbot.fun</div>
                    <div className="hero__subtitle">Paste a wallet.</div>
                    <div className="hero__subtitle">Reveal the degen story.</div>

                    <form onSubmit={handleSearch} className="search">
                        <div className="search__container">
                            <i class="search__icon fa-solid fa-xl fa-magnifying-glass"></i>
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
                    <div className="stats__grid">
                        <div className="stats__card stats__card--win">
                            <h3 className="stats__card-title">Biggest Win in 24h</h3>
                            <div className="stats__card-content">
                                {/* Empty for now */}
                            </div>
                        </div>

                        <div className="stats__card stats__card--loss">
                            <h3 className="stats__card-title">Biggest Loss in 24h</h3>
                            <div className="stats__card-content">
                                {/* Empty for now */}
                            </div>
                        </div>

                        <div className="stats__card stats__card--fumble">
                            <h3 className="stats__card-title">Biggest Fumble in 24h</h3>
                            <div className="stats__card-content">
                                {/* Empty for now */}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Home;