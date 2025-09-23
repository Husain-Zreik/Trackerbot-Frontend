import { useEffect } from "react";

const Home = () => {
    const themes = ["light", "dark", "red"];
    let current = 0;

    function toggleTheme() {
        current = (current + 1) % themes.length;
        document.documentElement.setAttribute("data-theme", themes[current]);
        console.log("Theme set to:", themes[current]);
    }

    useEffect(() => {
        // Set initial theme
        document.documentElement.setAttribute("data-theme", themes[current]);

        const btn = document.getElementById("theme-toggle");
        btn?.addEventListener("click", toggleTheme);

        return () => btn?.removeEventListener("click", toggleTheme);
    }, []);

    return (
        <div className="homepage">
            <header className="header">
                <div className="header__brand">trackerbot.fun</div>
                <nav className="header__nav">
                    <a href="#" className="header__nav-link">Leaderboard</a>
                    <button id="theme-toggle">Toggle Theme</button>
                </nav>
            </header>

            <main className="main">
                <div className="hero">
                    <h1 className="hero__title">trackerbot.fun</h1>
                    <p className="hero__subtitle">Paste a wallet.</p>
                    <p className="hero__subtitle">Reveal the degen story.</p>

                    <div className="search">
                        <div className="search__container">
                            <div className="search__icon">🔍</div>
                            <input
                                type="text"
                                className="search__input"
                                placeholder=""
                            />
                        </div>
                    </div>
                </div>

                <div className="stats">
                    <div className="stats__grid">
                        <div className="stats__card stats__card--win">
                            <h3 className="stats__card-title">Biggest Win in 24h</h3>
                            <div className="stats__card-content">
                                {/* Content would go here */}
                            </div>
                        </div>

                        <div className="stats__card stats__card--loss">
                            <h3 className="stats__card-title">Biggest Loss in 24h</h3>
                            <div className="stats__card-content">
                                {/* Content would go here */}
                            </div>
                        </div>

                        <div className="stats__card stats__card--fumble">
                            <h3 className="stats__card-title">Biggest Fumble in 24h</h3>
                            <div className="stats__card-content">
                                {/* Content would go here */}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Home;
