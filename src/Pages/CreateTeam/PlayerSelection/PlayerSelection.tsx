import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { CSSProperties, useState } from 'react';
import { Grid2, TextField } from '@mui/material';
import { useFplContext } from '../../../Contexts/context';
import './PlayerSelection.scss';
import { PlayerSelectionCard, resolvePostion } from './PlayerSelectionCard';
import { Player } from '../../../Types/DataType';
const PlayerList = ({
  players,
  inheritedStyle,
  position,
  setPos,
  setDialogState,
}: {
  players: any;
  inheritedStyle?: CSSProperties;
  position: any;
  setPos: any;
  setDialogState: any;
}) => {
  const { state } = useFplContext();
  const [search, setSearch] = useState('');
  const [team, setTeam] = useState('All');
  const teams = Array.from(
    new Set(state.globalTable?.map((player: Player) => player.team.name))
  );
  const positions = ['GK', 'MID', 'DEF', 'FOR'];

  const handleSearch = (event: any) => {
    setSearch(event.target.value);
  };

  let filteredPlayers: any[] = players.filter((player: any) => {
    return (
      player.searchTerm.toLowerCase().includes(search.toLowerCase()) &&
      (team !== 'All' ? player.team.name === team : true) &&
      (position !== 'All'
        ? resolvePostion(player.data.positionId) === position
        : true)
    );
  });
  const gkLength: any =
    filteredPlayers.filter((player) => player.data.positionId === 1).length ===
    0;
  const midLength: any =
    filteredPlayers.filter((player) => player.data.positionId === 3).length ===
    0;
  const defLength =
    filteredPlayers.filter((player) => player.data.positionId === 2).length ===
    0;
  const strikeLength =
    filteredPlayers.filter((player) => player.data.positionId === 4).length ===
    0;
  const positionsShowed = {
    gk: midLength && defLength && strikeLength,

    def: midLength && gkLength && strikeLength,

    mid: gkLength && defLength && strikeLength,

    for: midLength && defLength && gkLength,
  };
  return (
    <div style={{ width: '290px', ...inheritedStyle }}>
      <TextField
        label="Search Players"
        variant="outlined"
        value={search}
        onChange={handleSearch}
        fullWidth
        sx={{ marginBottom: 3 }}
      />{' '}
      <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="team-dropdown modern-select">Team</InputLabel>
        <Select
          value={team}
          className="team-dropdown modern-select"
          sx={{ width: '125px' }}
        >
          <MenuItem
            value="All"
            sx={{ width: '125px' }}
            onClick={() => setTeam('All')}
          >
            <em>All</em>
          </MenuItem>
          {teams.map((team) => (
            <MenuItem
              key={team}
              sx={{ width: '125px' }}
              value={team}
              onClick={() => setTeam(team)}
            >
              {team}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="team-dropdown modern-select">Position</InputLabel>
        <Select
          value={position}
          sx={{ width: '125px' }}
          className="position-dropdown modern-select"
        >
          <MenuItem value="All" onClick={() => setPos('All')}>
            All Positions
          </MenuItem>
          {positions.map((position) => (
            <MenuItem
              key={position}
              value={position}
              onClick={() => setPos(position)}
            >
              {position}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Grid2
        container
        spacing={2}
        style={{
          maxWidth: '350px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {filteredPlayers.filter((player) => player.data.positionId === 1)
          .length === 0 ? (
          <></>
        ) : (
          <>
            <div className="outerBox">
              <span className="innerBox">Goalkeepers</span>
            </div>
            <Grid2
              key={'gk1'}
              sx={{
                width: 300,
                height: positionsShowed.gk ? '100%' : 200,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'scroll',
              }}
            >
              {filteredPlayers
                .filter((item) => item.data.positionId === 1)
                .map((player: any) => (
                  <PlayerSelectionCard
                    setDialog={setDialogState}
                    key={player.code}
                    player={player}
                  />
                ))}
            </Grid2>
          </>
        )}
        {filteredPlayers.filter((player) => player.data.positionId === 2)
          .length === 0 ? (
          <></>
        ) : (
          <>
            <div className="outerBox">
              <span className="innerBox">Defenders</span>
            </div>
            <Grid2
              key={'mid1'}
              sx={{
                width: 300,
                height: positionsShowed.def ? '100%' : 200,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'scroll',
              }}
            >
              {filteredPlayers
                .filter((item) => item.data.positionId === 2)
                .map((player: any) => (
                  <PlayerSelectionCard
                    setDialog={setDialogState}
                    key={player.code}
                    player={player}
                  />
                ))}
            </Grid2>
          </>
        )}
        {filteredPlayers.filter((player) => player.data.positionId === 3)
          .length === 0 ? (
          <></>
        ) : (
          <>
            <div className="outerBox">
              <span className="innerBox">Midfielders</span>
            </div>
            <Grid2
              key={'def1'}
              sx={{
                width: 300,
                height: positionsShowed.mid ? '100%' : 200,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'scroll',
              }}
            >
              {filteredPlayers
                .filter((item) => item.data.positionId === 3)
                .map((player: any) => (
                  <PlayerSelectionCard
                    setDialog={setDialogState}
                    key={player.code}
                    player={player}
                  />
                ))}
            </Grid2>
          </>
        )}
        {filteredPlayers.filter((player) => player.data.positionId === 4)
          .length === 0 ? (
          <></>
        ) : (
          <>
            <div className="outerBox">
              <span className="innerBox">Forwards</span>
            </div>
            <Grid2
              key={'strike1'}
              sx={{
                width: 300,
                height: positionsShowed.for ? '100%' : 200,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'scroll',
              }}
            >
              {filteredPlayers
                .filter((item) => item.data.positionId === 4)
                .map((player: any) => (
                  <PlayerSelectionCard
                    setDialog={setDialogState}
                    key={player.code}
                    player={player}
                  />
                ))}
            </Grid2>
          </>
        )}
      </Grid2>
    </div>
  );
};
export default PlayerList;
