import React, { useState } from "react";
import "./Filters.scss";
interface FilterProps {
  handleSearch: any;
  onTeamFilter: (team: string) => void;
  onPositionFilter: (position: string) => void;
  onPriceFilter: (price: number) => void;
  teams: string[];
  positions: string[];
  maxPrice: number;
  minPrice: number;
  searchQuery: string;
}

const Filters: React.FC<FilterProps> = ({
  onTeamFilter,
  onPositionFilter,
  onPriceFilter,
  teams,
  positions,
  maxPrice,
  minPrice,
  handleSearch,
  searchQuery,
}) => {
  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("");
  const [selectedPrice, setSelectedPrice] = useState(maxPrice);

  const handleTeamChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTeam(e.target.value);
    onTeamFilter(e.target.value);
  };

  const handlePositionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPosition(e.target.value);
    onPositionFilter(e.target.value);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPrice(parseFloat(e.target.value));
    onPriceFilter(parseFloat(e.target.value));
  };

  return (
    <div className="player-filters">
      <div className="search-bar">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search..."
          className="modern-input"
        />
      </div>
      <select
        value={selectedTeam}
        onChange={handleTeamChange}
        className="team-dropdown modern-select"
      >
        <option value="">All Teams</option>
        {teams.map((team) => (
          <option key={team} value={team}>
            {team}
          </option>
        ))}
      </select>

      <select
        value={selectedPosition}
        onChange={handlePositionChange}
        className="position-dropdown modern-select"
      >
        <option value="">All Positions</option>
        {positions.map((position) => (
          <option key={position} value={position}>
            {position}
          </option>
        ))}
      </select>

      <select
        value={selectedPrice}
        onChange={handlePriceChange}
        className="price-dropdown modern-select"
      >
        {[...Array(Math.ceil(maxPrice * 2) + 1)].map((_, index) => {
          const price = index * 0.5;
          if (price >= minPrice) {
            return (
              <option key={price} value={price}>
                {price.toFixed(1)}
              </option>
            );
          }
        })}
      </select>
    </div>
  );
};

export default Filters;
