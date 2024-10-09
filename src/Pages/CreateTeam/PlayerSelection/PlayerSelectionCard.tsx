import { Card, Avatar, Box, Typography, IconButton } from '@mui/material';
import { useFplContext } from '../../../Contexts/context';
import { iconSrc } from '../../../Icons/Icons';
import PlayerSummary from './PlayerSummary';
import { useState } from 'react';
import InfoIcon from '@mui/icons-material/Info';

export const PlayerSelectionCard = ({
  player,
  setDialog,
}: {
  player: any;
  setDialog: any;
}) => {
  const fplCtx = useFplContext();
  const [openInfo, setOpenInfo] = useState<boolean>(false);

  function addPlayer() {
    setDialog(false);
    let totalCost = fplCtx.state.teamCreationState.teamCost;
    let currCount = fplCtx.state.teamCreationState.totalCount;
    let itemAdded = false;
    switch (player.data.positionId) {
      case 1:
        let gk = fplCtx.state.teamCreationState.gk;
        if (!gk.hasOwnProperty(player.code) && Object.keys(gk).length < 2) {
          itemAdded = true;
          gk[player.code] = player;
          totalCost += player.data.nowCost / 10;
          fplCtx.dispatch({
            type: 'SET_TEAM_CREATION',
            payload: {
              pos: 'gk',
              body: gk,
            },
          });
          fplCtx.dispatch({
            type: 'SET_TEAM_CREATION_COST',
            payload: totalCost,
          });
        }
        break;
      case 2:
        let def = fplCtx.state.teamCreationState.def;
        if (!def.hasOwnProperty(player.code) && Object.keys(def).length < 5) {
          itemAdded = true;
          def[player.code] = player;
          totalCost += player.data.nowCost / 10;
          fplCtx.dispatch({
            type: 'SET_TEAM_CREATION',
            payload: {
              pos: 'def',
              body: def,
            },
          });
          fplCtx.dispatch({
            type: 'SET_TEAM_CREATION_COST',
            payload: totalCost,
          });
        }

        break;
      case 3:
        s;
        let mid = fplCtx.state.teamCreationState.mid;
        if (!mid.hasOwnProperty(player.code) && Object.keys(mid).length < 5) {
          itemAdded = true;
          mid[player.code] = player;
          totalCost += player.data.nowCost / 10;
          fplCtx.dispatch({
            type: 'SET_TEAM_CREATION',
            payload: {
              pos: 'mid',
              body: mid,
            },
          });
          fplCtx.dispatch({
            type: 'SET_TEAM_CREATION_COST',
            payload: totalCost,
          });
        }

        break;
      case 4:
        let strike = fplCtx.state.teamCreationState.strike;
        if (
          !strike.hasOwnProperty(player.code) &&
          Object.keys(strike).length < 3
        ) {
          itemAdded = true;
          strike[player.code] = player;
          totalCost += player.data.nowCost / 10;
          fplCtx.dispatch({
            type: 'SET_TEAM_CREATION',
            payload: {
              pos: 'strike',
              body: strike,
            },
          });
          fplCtx.dispatch({
            type: 'SET_TEAM_CREATION_COST',
            payload: totalCost,
          });
        }
        break;

      default:
        break;
    }
    if (itemAdded) {
      fplCtx.dispatch({
        type: 'SET_TEAM_CREATION_COUNT',
        payload: currCount + 1,
      });
    }
  }
  return (
    <>
      <Card
        sx={{
          display: 'flex',
          padding: 0,
          marginBottom: 2,
          alignItems: 'center',
          minWidth: 282,
          maxWidth: 295,
          minHeight: 50,
          maxHeight: 50,
          backgroundColor: 'white',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          '&:hover': {
            transform: 'scale(1.03)',
            boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.15)',
          },
          '&:active': {
            transform: 'scale(0.98)',
            boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.1)',
          },
        }}
        onClick={addPlayer}
      >
        <Avatar
          src={iconSrc[player.team.name]['logo']}
          alt={player.webName}
          sx={{ width: 30, height: 30, margin: 1.5 }}
        />
        <Box
          sx={{
            minWidth: 76,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography
            sx={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
            variant="caption"
          >
            {player.webName}
          </Typography>
          <Box
            sx={{
              width: 76,
              display: 'flex',
              justifyContent: 'space-between',
              paddingTop: 0.5,
            }}
          >
            <Typography variant="caption">{player?.team?.codeName}</Typography>
            <Typography variant="caption">
              {resolvePostion(player?.data?.positionId)}
            </Typography>
          </Box>
        </Box>
        <Typography variant="caption" minWidth={62} textAlign={'center'}>
          £{player?.data?.priceInfo?.Value}M
        </Typography>
        <Typography variant="caption" minWidth={62} textAlign={'center'}>
          {player?.data?.weighted_prediction.toFixed(2)}
        </Typography>
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            setOpenInfo(true);
          }}
          sx={{
            transition: 'color 0.2s ease-in-out',
            '&:hover': {
              color: 'primary.main',
            },
          }}
        >
          <InfoIcon />
        </IconButton>
      </Card>
      <PlayerSummary
        player={player}
        open={openInfo}
        onClose={() => {
          setOpenInfo(false);
        }}
      />
    </>
  );
};

export function resolvePostion(pos: number) {
  switch (pos) {
    case 1:
      return 'GK';
    case 2:
      return 'DEF';
    case 3:
      return 'MID';
    case 4:
      return 'FOR';
    default:
      break;
  }
}
