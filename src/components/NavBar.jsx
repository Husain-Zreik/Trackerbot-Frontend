const Navbar = () => {

    return (
        <nav className="navbar">
            <div className="navbar__block"></div>
            <div className="navbar__container">
                <div className="navbar__content">
                    <div className="navbar__brand">trackerbot.fun</div>
                    <div className="navbar__nav">
                        <a href="#" className="navbar__nav-link">Leaderboard</a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;