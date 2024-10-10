import { useEffect, useState } from 'react';
import { Box, Dialog, DialogContent, IconButton } from '@mui/material';
import PlayerList from './PlayerSelection/PlayerSelection';
import { useFplContext } from '../../Contexts/context';
import CloseIcon from '@mui/icons-material/Close';
import { Pitch } from './Pitch/Pitch';
import { Player } from '../../Types/DataType';

const FplLineup = () => {
  const fplCtx = useFplContext();
  const { gk, mid, strike, def } = fplCtx.state.teamCreationState;
  const [position, setPosition] = useState('All');
  const [openDialog, setOpenDialog] = useState(false);
  const teamTable = fplCtx.state.teamTable;
  useEffect(() => {
    if (teamTable && Array.isArray(teamTable)) {
      const positionsMap: any = {
        1: 'gk',
        2: 'def',
        3: 'mid',
        4: 'strike',
      };

      const teamData: any = {
        gk: {},
        def: {},
        mid: {},
        strike: {},
        totalCount: 0,
        teamCost: 0,
      };

      teamTable.forEach((player: Player) => {
        const positionKey = positionsMap[player.data.positionId];

        if (positionKey) {
          teamData[positionKey][player.code] = player;
          teamData.totalCount += 1;
          teamData.teamCost += player.data.nowCost / 10;
        }
      });

      console.log(teamData);

      fplCtx.dispatch({
        type: 'SET_TEAM_CREATION_COMPLETE',
        payload: teamData,
      });
    }
  }, [teamTable]);
  const handleOpenDialog = (position: string) => {
    if (window.outerWidth < 770) {
      setOpenDialog(true);
    }
    setPosition(position);
  };
  const handleCloseDialog = () => setOpenDialog(false);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        height: '90vh',
        overflow: 'hidden', // Prevent page scrolling
      }}
    >
      {/* Pitch and Players Box */}
      <Pitch
        gk={gk}
        mid={mid}
        strike={strike}
        def={def}
        handleOpenDialog={handleOpenDialog}
      />
      {/* PLayers list */}
      <div style={{ overflowY: 'auto' }}>
        <Box
          sx={{
            display: { xs: 'none', sm: 'none', md: 'flex' },
            flexBasis: '25%',
            textAlign: '-webkit-center',
            maxHeight: 'calc(100vh - 64px)',
            overflowY: 'auto',
          }}
        >
          <PlayerList
            setDialogState={setOpenDialog}
            position={position}
            setPos={setPosition}
            players={fplCtx.state.globalTable}
          />
        </Box>
      </div>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogContent>
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleCloseDialog}
            aria-label="close"
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
          <PlayerList
            setDialogState={setOpenDialog}
            position={position}
            setPos={setPosition}
            players={fplCtx.state.globalTable}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export function round(value: any, precision: any) {
  var multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
}

export default FplLineup;
