import { Box } from '@mui/material';
import TeamSummaryCarousel from '../Carousel/InfoCarousel';
import { EmptyPlayerCard } from './EmptyPlayerCard';
import { PlayerCard } from './PlayerCard';

export const Pitch = ({
  gk,
  mid,
  def,
  strike,
  handleOpenDialog,
}: {
  gk: any;
  mid: any;
  def: any;
  strike: any;
  handleOpenDialog: any;
}) => {
  return (
    <Box
      sx={{
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        overflow: 'hidden',
        flexBasis: '0%',
      }}
    >
      <TeamSummaryCarousel
        players={[
          ...Object.keys(gk).map((key) => gk[key]),
          ...Object.keys(mid).map((key) => mid[key]),
          ...Object.keys(def).map((key) => def[key]),
          ...Object.keys(strike).map((key) => strike[key]),
        ]}
      />
      {/* Player Cards & Pitch */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
          backgroundImage: "url('/pitch.svg')",
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          // backgroundPosition: 'center center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: '70%',
            justifyContent: 'space-evenly',
          }}
        >
          {Object.keys(gk).map((player) => (
            <PlayerCard key={player} player={gk[player]} />
          ))}
          {Array.from({ length: 2 - Object.keys(gk).length }).map(
            (_, index) => (
              <EmptyPlayerCard
                addHandler={() => handleOpenDialog('GK')}
                key={index}
              />
            )
          )}
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-evenly',
            width: '100%',
          }}
        >
          {Object.keys(def).map((player) => (
            <PlayerCard key={player} player={def[player]} />
          ))}
          {Array.from({ length: 5 - Object.keys(def).length }).map(
            (_, index) => (
              <EmptyPlayerCard
                addHandler={() => handleOpenDialog('DEF')}
                key={index}
              />
            )
          )}
        </Box>

        {/* MID */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-evenly',
            width: '100%',
          }}
        >
          {Object.keys(mid).map((player) => (
            <PlayerCard key={player} player={mid[player]} />
          ))}
          {Array.from({ length: 5 - Object.keys(mid).length }).map(
            (_, index) => (
              <EmptyPlayerCard
                addHandler={() => handleOpenDialog('MID')}
                key={index}
              />
            )
          )}
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-evenly',
            width: '100%',
          }}
        >
          {Object.keys(strike).map((player) => (
            <PlayerCard key={player} player={strike[player]} />
          ))}
          {Array.from({ length: 3 - Object.keys(strike).length }).map(
            (_, index) => (
              <EmptyPlayerCard
                addHandler={() => handleOpenDialog('FOR')}
                key={index}
              />
            )
          )}
        </Box>
      </Box>
    </Box>
  );
};
