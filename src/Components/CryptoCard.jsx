import React from "react";
import { Link } from "react-router";
import { formatPrice, formatMarketCap } from "../utils/formatter";

const CryptoCard = ({ crypto }) => {
  const crypto24hr = crypto.price_change_percentage_24h;
  return (
    <Link to={`/coin/${crypto.id}`} style={{ textDecoration: "none" }}>
      <div className="crypto-card">
        <div className="crypto-header">
          <div className="crypto-info">
            <img src={crypto.image} alt={crypto.name} />
            <div>
              <h3>{crypto.name}</h3>
              <p className="symbol">{crypto.symbol.toUpperCase()}</p>
              <span className="rank">#{crypto.market_cap_rank}</span>
            </div>
          </div>
        </div>
        <div className="crypto-price">
          <p className="price">{formatPrice(crypto.current_price)}</p>
          <p className={`change ${crypto24hr >= 0 ? "positive" : "negative"}`}>
            {crypto24hr >= 0 ? "↑" : "↓"} {Math.abs(crypto24hr).toFixed(2)} %
          </p>
        </div>
        <div className="crypto-stats">
          <div className="stat">
            <span className="stat-label">Market Cap</span>
            <span className="stat-value">
              ${formatMarketCap(crypto.market_cap)}
            </span>
          </div>
          <div className="stat">
            <span className="stat-label">Volume</span>
            <span className="stat-value">
              {formatMarketCap(crypto.total_volume)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CryptoCard;
