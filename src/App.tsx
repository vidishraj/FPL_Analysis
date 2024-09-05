import React, { useCallback, useEffect, useState } from "react";
import { data } from "./api";
import Filters from "./Filters/Filters";
import { Header } from "./Header/Header";
import { Table } from "./Table/Table";
import { Player } from "./Table/DataType";

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredData, setFilteredData] = useState<Player[]>();
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [teams, setTeams] = useState<string[]>([]);

  const positions = ["GK", "MID", "DEF", "FOR"];

  const [filterModel, setFilterModel] = useState(null);
  useEffect(() => {
    data().then((response: any) => {
      setFilteredData(response.data);
      setMaxPrice(
        Math.max(
          ...(response.data
            ? response.data.map((player: Player) => player.data.nowCost / 10)
            : [0]),
        ),
      );
      setMinPrice(
        Math.min(
          ...(response.data
            ? response.data.map((player: Player) => player.data.nowCost / 10)
            : [5]),
        ),
      );
      setTeams(
        Array.from(
          new Set(response.data?.map((player: Player) => player.team.name)),
        ),
      );
    });
  }, []);
  const handleSearch = useCallback(
    (
      e: React.ChangeEvent<HTMLInputElement>,
      filteredData: Player[] | undefined,
    ) => {
      const query = e.target.value.toLowerCase();
      setSearchQuery(query);
      const filtered = filteredData?.filter((item: any) =>
        item.searchTerm.toLowerCase().includes(query),
      );
      setFilteredData(filtered);
      // eslint-disable-next-line
    },
    [],
  );

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
          filterTo: price + 0.1,
        },
      }));
    }
  };

  return (
    <>
      <Header setFilteredData={setFilteredData} />
      <Filters
        handleSearch={(e: any) => {
          handleSearch(e, filteredData);
        }}
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
