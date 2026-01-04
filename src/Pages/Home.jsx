import React, { useEffect, useState, useMemo } from "react";
import { fetchCryptos } from "../API/CoinGeckos";
import CryptoCard from "../Components/CryptoCard";
import Pagination from "../Components/Pagination";
import crypto_cap from "../assets/crypto-cap.png";
import { Link } from "react-router";

const Home = () => {
  const [cryptoList, setCryptoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("market_cap_rank");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const fetchCryptoData = async () => {
    try {
      const cryptoData = await fetchCryptos();
      setCryptoList(cryptoData);
    } catch (err) {
      console.error("Error while fetching crypto data:", err);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchCryptoData();
  }, []);

  const filteredList = useMemo(() => {
    let filtered = cryptoList.filter(
      (crypto) =>
        crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "price":
          return a.current_price - b.current_price;
        case "price_desc":
          return b.current_price - a.current_price;
        case "change":
          return a.price_change_percentage_24h - b.price_change_percentage_24h;
        case "market_cap":
          return a.market_cap - b.market_cap;
        default:
          return a.market_rank - b.market_rank;
      }
    });
  }, [cryptoList, searchQuery, sortBy]);

  const coinsPerPage = 15;
  const totalPages = Math.ceil(filteredList.length / coinsPerPage);
  const startIndex = (currentPage - 1) * coinsPerPage;
  const endIndex = startIndex + coinsPerPage;
  const currentCoins = filteredList.slice(startIndex, endIndex);

  const onPageChange = (page) => {
    if (page <= 0 || page > totalPages) return;
    setCurrentPage(page);
  };
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div className="logo-section">
            <Link
              to="/"
              onClick={() => setSearchQuery("")}
              className="logo-link"
            >
              <img src={crypto_cap} alt="CryptoCap Logo" />
            </Link>

            <p>Real-time cryptocurrency prices and market data</p>
          </div>
          <div className="search-section">
            <input
              type="text"
              className="search-input"
              placeholder="Search Cryptos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </header>
      <div className="controls">
        <div className="filter-group">
          <label>Sort By:</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="market_cap_rank">Rank</option>
            <option value="name">Name</option>
            <option value="price">Price (Low to High)</option>
            <option value="price_desc">Price (High to Low)</option>
            <option value="change">24h Change</option>
            <option value="market_cap">Market Cap</option>
          </select>
        </div>
        <div className="view-toggle">
          <button
            className={viewMode === "grid" ? "active" : ""}
            onClick={() => setViewMode("grid")}
          >
            Grid
          </button>
          <button
            className={viewMode === "list" ? "active" : ""}
            onClick={() => setViewMode("list")}
          >
            List
          </button>
        </div>
      </div>
      {isLoading ? (
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading crypto data...</p>
        </div>
      ) : (
        <div className={`crypto-container ${viewMode}`}>
          {currentCoins.map((crypto, key) => {
            return <CryptoCard crypto={crypto} key={key} />;
          })}
        </div>
      )}
      <Pagination
        totalPages={totalPages}
        currentCoins={currentCoins}
        currentPage={currentPage}
        onPageChange={onPageChange}
      ></Pagination>
      <footer className="footer">
        <p>
          Developed & maintained by <strong>D-code</strong> © 2025. All rights
          reserved.
        </p>
        <p>Data provided by CoinGecko API.</p>
      </footer>
    </div>
  );
};

export default Home;
