import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
    const [wallets, setWallets] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [isInputFocused, setIsInputFocused] = useState(false);
    const inputRef = useRef(null);
    const navigate = useNavigate();

    const handleAddWallet = (wallet) => {
        const trimmedWallet = wallet.trim();

        // Basic validation for wallet address
        if (trimmedWallet && !wallets.includes(trimmedWallet)) {
            if (trimmedWallet.length > 20) { // Basic check for wallet length
                setWallets([...wallets, trimmedWallet]);
                setInputValue("");
                return true;
            }
        }
        return false;
    };

    const handleInputKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            if (inputValue.trim()) {
                handleAddWallet(inputValue);
            }
        } else if (e.key === 'Backspace' && !inputValue && wallets.length > 0) {
            // Remove last wallet if backspace pressed with empty input
            setWallets(wallets.slice(0, -1));
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedText = e.clipboardData.getData('text');

        // Split by common delimiters
        const potentialWallets = pastedText.split(/[\s,;|\n]+/);
        const validWallets = [];

        potentialWallets.forEach(wallet => {
            const trimmed = wallet.trim();
            if (trimmed && trimmed.length > 20 && !wallets.includes(trimmed)) {
                validWallets.push(trimmed);
            }
        });

        if (validWallets.length > 0) {
            setWallets([...wallets, ...validWallets]);
            setInputValue("");
        }
    };

    const removeWallet = (indexToRemove) => {
        setWallets(wallets.filter((_, index) => index !== indexToRemove));
    };

    const handleSearch = (e) => {
        e.preventDefault();

        // Add current input as wallet if present
        if (inputValue.trim()) {
            const added = handleAddWallet(inputValue);
            if (added) {
                // Navigate with all wallets including the just-added one
                const allWallets = [...wallets, inputValue.trim()];
                if (allWallets.length > 0) {
                    navigate(`/result?wallets=${encodeURIComponent(allWallets.join(','))}`);
                }
            }
        } else if (wallets.length > 0) {
            // Navigate with existing wallets
            navigate(`/result?wallets=${encodeURIComponent(wallets.join(','))}`);
        }
    };

    const handleClearAll = () => {
        setWallets([]);
        setInputValue("");
        inputRef.current?.focus();
    };

    // Focus management
    useEffect(() => {
        if (isInputFocused) {
            inputRef.current?.focus();
        }
    }, [wallets]);

    return (
        <form onSubmit={handleSearch} className="search-bar">
            <div
                className={`search-bar__container ${wallets.length > 0 ? 'search-bar__container--has-wallets' : ''} ${isInputFocused ? 'search-bar__container--focused' : ''}`}
                onClick={() => inputRef.current?.focus()}
            >
                <i className="search-bar__icon fa-solid fa-xl fa-magnifying-glass"></i>

                <div className="search-bar__input-wrapper">
                    {wallets.map((wallet, index) => (
                        <div key={index} className="search-bar__tag">
                            <span className="search-bar__tag-text">
                                {wallet.length > 20
                                    ? `${wallet.slice(0, 6)}...${wallet.slice(-4)}`
                                    : wallet
                                }
                            </span>
                            <button
                                type="button"
                                className="search-bar__tag-remove"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeWallet(index);
                                }}
                            >
                                <i className="fa-solid fa-times"></i>
                            </button>
                        </div>
                    ))}

                    <input
                        ref={inputRef}
                        type="text"
                        className="search-bar__input"
                        placeholder={wallets.length === 0 ? "Enter wallet addresses..." : "Add another wallet..."}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleInputKeyDown}
                        onPaste={handlePaste}
                        onFocus={() => setIsInputFocused(true)}
                        onBlur={() => setIsInputFocused(false)}
                    />
                </div>

                {wallets.length > 0 && (
                    <button
                        type="button"
                        className="search-bar__clear-all"
                        onClick={handleClearAll}
                        title="Clear all wallets"
                    >
                        <i className="fa-solid fa-times-circle"></i>
                    </button>
                )}
            </div>

            {wallets.length > 0 && (
                <div className="search-bar__actions">
                    <button type="submit" className="btn btn--success btn--large btn--pulse">
                        <i className="fa-solid fa-chart-line"></i>
                        Analyze {wallets.length} wallet{wallets.length > 1 ? 's' : ''}
                    </button>
                </div>
            )}
        </form>
    );
};

export default SearchBar;