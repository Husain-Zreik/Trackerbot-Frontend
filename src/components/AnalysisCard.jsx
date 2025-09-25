
const AnalysisCard = ({ type, title, headers, data }) => {
    const renderDataValue = (item) => {
        switch (type) {
            case 'wins':
                return <span className="result__profit">{item.profit}</span>;
            case 'losses':
                return <span className="result__loss">{item.loss}</span>;
            case 'fumbles':
                return <span className="result__value">{item.value}</span>;
            default:
                return null;
        }
    };

    return (
        <div className={`result__analysis-card result__analysis-card--${type}`}>
            <h3 className="result__analysis-title">{title}</h3>
            <div className="result__analysis-header">
                <span>{headers.left}</span>
                <span>{headers.right}</span>
            </div>
            <div className="result__analysis-content">
                {data.map((item, index) => (
                    <div key={index} className="result__analysis-row">
                        <span className="result__token">{item.token}</span>
                        {renderDataValue(item)}
                    </div>
                ))}
            </div>
        </div>
    );
};


export default AnalysisCard;