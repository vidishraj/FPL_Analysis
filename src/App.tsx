import React, { useCallback, useMemo, useState } from "react";
import { data } from "./sampleData";
import Filters from "./Filters/Filters";
import { Header } from "./Header/Header";
import { Table } from "./Table/Table";

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredData, setFilteredData] = useState<any>(data);
  const teams = Array.from(new Set(data.map((player) => player.team.name)));
  const positions = ["GK", "MID", "DEF", "FOR"];
  const maxPrice = Math.max(...data.map((player) => player.data.nowCost / 10));
  const minPrice = Math.min(...data.map((player) => player.data.nowCost / 10));

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    let innerData: any = data;
    const filtered = innerData.filter((item: any) =>
      item.searchTerm.toLowerCase().includes(query),
    );
    setFilteredData(filtered);
  }, []);

  const handleTeamFilter = (team: string) => {
    let innerData: any = data;
    setFilteredData(
      innerData.filter((player: any) =>
        team ? player.team.name === team : true,
      ),
    );
  };

  const handlePositionFilter = (position: string) => {
    const posMap: any = {
      4: "FOR",
      3: "MID",
      2: "DEF",
      1: "GK",
    };
    setFilteredData(
      filteredData.filter((player: any) =>
        position ? posMap[player.data.positionId] === position : true,
      ),
    );
  };

  const handlePriceFilter = (price: number) => {
    setFilteredData(
      filteredData.filter((player: any) => player.data.nowCost <= price * 10),
    );
  };

  return (
    <>
      <Header />
      <Filters
        handleSearch={handleSearch}
        onTeamFilter={handleTeamFilter}
        onPositionFilter={handlePositionFilter}
        onPriceFilter={handlePriceFilter}
        teams={teams}
        positions={positions}
        maxPrice={maxPrice}
        minPrice={minPrice}
        searchQuery={searchQuery}
      />
      <Table data={filteredData} />
    </>
  );
};

export default App;
