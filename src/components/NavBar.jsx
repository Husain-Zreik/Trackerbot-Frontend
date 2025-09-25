const Navbar = () => {

    const handleConnectToX = () => {
        window.open('https://twitter.com/intent/follow?screen_name=trackerbot_fun', '_blank');
    };

    return (
        <nav className="navbar">
            <div className="navbar__block"></div>
            <div className="navbar__container">
                <div className="navbar__content">
                    <div className="navbar__brand">trackerbot.fun</div>
                    <div className="navbar__nav">
                        <button
                            onClick={handleConnectToX}
                            className="navbar__connect-btn"
                        >
                            <svg className="navbar__connect-icon" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                            Connect
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;