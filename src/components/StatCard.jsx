
const StatsCard = ({ type, title, children }) => {
    return (
        <div className={`stats__card stats__card--${type}`}>
            <h3 className="stats__card-title">{title}</h3>
            <div className="stats__card-content">
                {children}
            </div>
        </div>
    );
};

export default StatsCard;