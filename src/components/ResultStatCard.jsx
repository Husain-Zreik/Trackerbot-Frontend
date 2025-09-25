const ResultStatCard = ({ label, value }) => {
    return (
        <div className="result__stat-card">
            <h3 className="result__stat-title">{label}</h3>
            <div className="result__stat-value">{value}</div>
        </div>
    );
};

export default ResultStatCard;