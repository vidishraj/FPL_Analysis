import React, { useCallback, useState } from "react";
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
  const [filterModel, setFilterModel] = useState(null);

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
    if (team === "" && filterModel) {
      let currentModel: any = filterModel;
      delete currentModel["team.name"];
      setFilterModel((prev: any) => ({ ...prev, ...currentModel }));
    } else {
      setFilterModel((prev: any) => ({
        ...prev,
        "team.name": { values: [team], filterType: "set" },
      }));
    }
  };

  const handlePositionFilter = (position: string) => {
    if (position === "" && filterModel) {
      let currentModel: any = filterModel;
      delete currentModel["data.priceInfo.Position"];
      setFilterModel((prev: any) => ({ ...prev, ...currentModel }));
    } else {
      setFilterModel((prev: any) => ({
        ...prev,
        "data.priceInfo.Position": { values: [position], filterType: "set" },
      }));
    }
  };

  const handlePriceFilter = (price: number) => {
    if (price === 0 && filterModel) {
      let currentModel: any = filterModel;
      delete currentModel["data.nowCost"];
      setFilterModel((prev: any) => ({ ...prev, ...currentModel }));
    } else {
      setFilterModel((prev: any) => ({
        ...prev,
        "data.nowCost": {
          filterType: "number",
          type: "inRange",
          filter: 0.0,
          filterTo: (price + 0.1) * 10,
        },
      }));
    }
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
      <div
        style={{
          padding: "5px 5px",
          backgroundColor: "whitesmoke",
          color: "",
          border: "0.5px solid grey",
          width: "fit-content",
        }}
      >
        {" "}
        **Click on column header to sort! Slower scrolling on mobiles!
      </div>
      <Table
        data={filteredData}
        filterModel={filterModel}
        setFilterModel={setFilterModel}
      />
    </>
  );
};

export default App;
