import { Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useFplContext } from '../../../Contexts/context';
import { iconSrc } from '../../../Icons/Icons';

export const PlayerCard = ({ player }: { player: any }) => {
  const fplCtx = useFplContext();

  function removePlayer() {
    let totalCost = fplCtx.state.teamCreationState.teamCost;
    let currCount = fplCtx.state.teamCreationState.totalCount;
    let itemRemoved = false;

    switch (player.data.positionId) {
      case 1: {
        let gk = fplCtx.state.teamCreationState.gk;
        if (gk.hasOwnProperty(player.code)) {
          itemRemoved = true;
          delete gk[player.code];
          totalCost -= player.data.nowCost / 10;
          fplCtx.dispatch({
            type: 'SET_TEAM_CREATION',
            payload: { pos: 'gk', body: gk },
          });
          fplCtx.dispatch({
            type: 'SET_TEAM_CREATION_COST',
            payload: totalCost,
          });
        }
        break;
      }
      case 2: {
        let def = fplCtx.state.teamCreationState.def;
        if (def.hasOwnProperty(player.code)) {
          itemRemoved = true;
          delete def[player.code];
          totalCost -= player.data.nowCost / 10;
          fplCtx.dispatch({
            type: 'SET_TEAM_CREATION',
            payload: { pos: 'def', body: def },
          });
          fplCtx.dispatch({
            type: 'SET_TEAM_CREATION_COST',
            payload: totalCost,
          });
        }
        break;
      }
      case 3: {
        let mid = fplCtx.state.teamCreationState.mid;
        if (mid.hasOwnProperty(player.code)) {
          itemRemoved = true;
          delete mid[player.code];
          totalCost -= player.data.nowCost / 10;
          fplCtx.dispatch({
            type: 'SET_TEAM_CREATION',
            payload: { pos: 'mid', body: mid },
          });
          fplCtx.dispatch({
            type: 'SET_TEAM_CREATION_COST',
            payload: totalCost,
          });
        }
        break;
      }
      case 4: {
        let strike = fplCtx.state.teamCreationState.strike;
        if (strike.hasOwnProperty(player.code)) {
          itemRemoved = true;
          delete strike[player.code];
          totalCost -= player.data.nowCost / 10;
          fplCtx.dispatch({
            type: 'SET_TEAM_CREATION',
            payload: { pos: 'strike', body: strike },
          });
          fplCtx.dispatch({
            type: 'SET_TEAM_CREATION_COST',
            payload: totalCost,
          });
        }
        break;
      }
      default:
        break;
    }

    if (itemRemoved) {
      fplCtx.dispatch({
        type: 'SET_TEAM_CREATION_COUNT',
        payload: currCount - 1,
      });
    }
  }
  return (
    <Box
      sx={{
        position: 'relative', // Needed for positioning the close button
        borderRadius: '10px',
        border: '1px solid #ddd',
        textAlign: 'center',
        // p: 1,
        width: { xs: 60, sm: 60, md: 75, lg: 85 },
        height: { xs: 90, sm: 90, md: 100, lg: 105 },
        backgroundColor: 'transparent',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'nowrap',
      }}
    >
      <Box
        bgcolor={'rgb(30, 203, 30)'}
        sx={{
          display: 'flex',
          flexWrap: 'nowrap',
          justifyContent: 'space-evenly',
          width: { xs: 60, sm: 60, md: 75, lg: 85 },
          height: 20,
          flexGrow: 1,
        }}
      >
        <IconButton
          sx={{
            background: 'black',
            position: 'absolute',
            left: 2,
            top: 2,
            padding: 0,
          }}
          onClick={removePlayer}
        >
          <CloseIcon sx={{ fontSize: '', color: 'white' }} />
        </IconButton>
        <Typography fontSize={'0.7rem'} minWidth="70%" color="white">{`£${
          player.data.nowCost / 10
        }m`}</Typography>
      </Box>
      <Box>
        <Box
          sx={{
            width: { xs: 60, sm: 60, md: 75, lg: 85 },
            height: { xs: 50, sm: 55, md: 60, lg: 65 }, // Maintain the aspect ratio
            overflow: 'hidden', // Ensure the image doesn't overflow the box
          }}
        >
          <img
            src={iconSrc[player.team.name]['jerseyPicture']}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain', // Maintain aspect ratio and fit within the box
            }}
            alt="Shirt"
          />
        </Box>
      </Box>
      <Box
        sx={{
          width: { xs: 60, sm: 60, md: 75, lg: 85 },
          height: { xs: 50, sm: 40, md: 80, lg: 40 },
        }}
        display={'flex'}
        flexDirection={'column'}
        fontSize={'0.5rem'}
        fontWeight={'900 !important'}
      >
        <Typography
          fontSize={'0.7rem'}
          sx={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            width: '100%',
          }}
          bgcolor={'white'}
          justifySelf={'flex-start'}
          alignSelf={'flex-start'}
        >
          {player.webName}
        </Typography>
        <Typography
          width={'100%'}
          fontSize={'0.7rem'}
          bgcolor={'whitesmoke'}
          justifySelf={'flex-start'}
          alignSelf={'flex-start'}
        >
          {player.data.predictions[0].opp[0][0]?.toUpperCase()}
        </Typography>
      </Box>
    </Box>
  );
};
