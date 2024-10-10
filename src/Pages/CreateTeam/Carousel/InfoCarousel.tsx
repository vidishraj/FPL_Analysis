import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import Slider, { Settings } from 'react-slick';
import { Player } from '../../../Types/DataType';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { round } from '../CreateTeam';
import { useFplContext } from '../../../Contexts/context';

interface TeamSummaryCarouselProps {
  players: Player[];
}

interface Stats {
  numberOfTeams: number;
  avgOwnership: number;
  avgEliteOwnership: number;
  avgGoals: number;
  avgAssists: number;
  avgCleanSheets: number;
  avgThreat: number;
  avgInfluence: number;
  avgPointsEarned: number;
}

interface PredictedStats {
  avgPrediction4GW: number;
  avgCleanSheetsPer90: number;
  avgExpectedGoalsPer90: number;
  avgExpectedAssistsPer90: number;
  avgWeightedPrediction: number;
}

const calculateStats = (
  players: Player[]
): { overall: Stats; predicted: PredictedStats } => {
  const totalPlayers = players.length;
  const uniqueTeams = new Set(players.map((player) => player.team.code));

  const overall: Stats = {
    numberOfTeams: uniqueTeams.size,
    avgOwnership: round(
      players.reduce((acc, player) => acc + player.fpl_ownership, 0) /
        totalPlayers,
      1
    ),
    avgEliteOwnership: round(
      players.reduce((acc, player) => acc + player.elite_ownership, 0) /
        totalPlayers,
      1
    ),
    avgGoals: round(
      players.reduce((acc, player) => acc + player.fpl.goals_scored, 0) /
        totalPlayers,
      1
    ),
    avgAssists: round(
      players.reduce((acc, player) => acc + player.fpl.assists, 0) /
        totalPlayers,
      1
    ),
    avgCleanSheets: round(
      players.reduce((acc, player) => acc + player.fpl.clean_sheets, 0) /
        totalPlayers,
      1
    ),
    avgThreat: round(
      players.reduce((acc, player) => acc + parseFloat(player.fpl.threat), 0) /
        totalPlayers,
      1
    ),
    avgInfluence: round(
      players.reduce(
        (acc, player) => acc + parseFloat(player.fpl.influence),
        0
      ) / totalPlayers,
      1
    ),
    avgPointsEarned: round(
      players.reduce((acc, player) => acc + player.fpl.total_points, 0) /
        totalPlayers,
      1
    ),
  };

  const predicted: PredictedStats = {
    avgPrediction4GW: round(
      players.reduce((acc, player) => acc + player.data.prediction4GW, 0),
      1
    ),
    avgCleanSheetsPer90: round(
      players.reduce((acc, player) => acc + player.fpl.clean_sheets_per_90, 0) /
        totalPlayers,
      1
    ),
    avgExpectedGoalsPer90: round(
      players.reduce(
        (acc, player) => acc + player.fpl.expected_goals_per_90,
        0
      ) / totalPlayers,
      1
    ),
    avgExpectedAssistsPer90: round(
      players.reduce(
        (acc, player) => acc + player.fpl.expected_assists_per_90,
        0
      ) / totalPlayers,
      1
    ),
    avgWeightedPrediction: round(
      players.reduce((acc, player) => acc + player.data.weighted_prediction, 0),
      1
    ),
  };

  return { overall, predicted };
};

const TeamSummaryCarousel: React.FC<TeamSummaryCarouselProps> = ({
  players,
}) => {
  const [view, setView] = useState<'attackers' | 'defenders' | 'overall'>(
    'overall'
  );
  const { state } = useFplContext();
  const attackers = players.filter(
    (player) => player.data.positionId === 4 || player.data.positionId === 3
  ); // Forward
  const defenders = players.filter(
    (player) => player.data.positionId === 2 || player.data.positionId === 1
  ); // Defender

  const overallStats = calculateStats(players);
  const attackerStats = calculateStats(attackers);
  const defenderStats = calculateStats(defenders);

  const handleViewChange = (
    _: React.MouseEvent<HTMLElement>,
    newView: 'attackers' | 'defenders' | 'overall'
  ) => {
    if (newView) setView(newView);
  };

  const statsToDisplay =
    view === 'overall'
      ? overallStats
      : view === 'attackers'
      ? attackerStats
      : defenderStats;

  const settings: Settings = {
    dots: false,
    infinite: true,
    speed: 500,
    pauseOnHover: true,
    swipeToSlide: true,
    pauseOnFocus: true,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 2, // Display 2 cards
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
    ],
  };

  const statItem = (value: number | string, label: string) => {
    const percentageVal = value.toString().includes('%') ? true : false;
    value = value.toString().replace('%', '');
    return (
      <Box
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        width="fit-content"
      >
        <span
          style={{
            width: 'fit-content',
            padding: '1%',
            fontSize: '0.9rem',
          }}
        >
          {isNaN(parseFloat(value.toString())) ||
          (attackers.length === 0 && defenders.length === 0)
            ? '-'
            : percentageVal
            ? round(value, 1) + '%'
            : label === 'Budget'
            ? '£' + round(value, 1)
            : round(value, 1)}
        </span>
        <span
          style={{
            backgroundColor: 'rgb(55, 0, 60)',
            textWrap: 'nowrap',
            width: 'fit-content',
            paddingInline: '10px',
            paddingBlock: '4px',
            fontSize: '0.7rem',
            borderRadius: '10px',
            color: 'rgb(5, 240, 255)',
          }}
        >
          {label}
        </span>
      </Box>
    );
  };

  return (
    <Box>
      <ToggleButtonGroup
        value={view}
        style={{ maxHeight: '5vh' }}
        exclusive
        onChange={handleViewChange}
        aria-label="view switch"
      >
        <ToggleButton value="attackers">Attackers</ToggleButton>
        <ToggleButton value="defenders">Defenders</ToggleButton>
        <ToggleButton value="overall">Overall</ToggleButton>
      </ToggleButtonGroup>

      <Slider {...settings}>
        <Card>
          <CardContent style={{ maxHeight: '12vh', background: 'whitesmoke' }}>
            <Box
              flexBasis={'100%'}
              display={'flex'}
              justifyContent={'space-evenly '}
            >
              {statItem(
                statsToDisplay.overall.avgCleanSheets,
                'Avg Clean Sheets'
              )}
              {statItem(statsToDisplay.overall.avgInfluence, 'Avg Influence')}
            </Box>
          </CardContent>
        </Card>
        <Card>
          <CardContent style={{ maxHeight: '12vh', background: 'whitesmoke' }}>
            <Box
              flexBasis={'100%'}
              display={'flex'}
              justifyContent={'space-evenly '}
            >
              {statItem(statsToDisplay.overall.avgThreat, 'Avg Threat')}
              {statItem(
                statsToDisplay.overall.avgPointsEarned,
                'Avg Points Earned'
              )}
            </Box>
          </CardContent>
        </Card>
        <Card>
          <CardContent style={{ maxHeight: '12vh', background: 'whitesmoke' }}>
            <Box
              flexBasis={'100%'}
              display={'flex'}
              justifyContent={'space-evenly '}
            >
              {' '}
              {statItem(statsToDisplay.overall.numberOfTeams, 'Teams')}
              {statItem(
                statsToDisplay.overall.avgOwnership + '%',
                'Avg Ownership'
              )}
            </Box>
          </CardContent>
        </Card>
        <Card>
          <CardContent style={{ maxHeight: '12vh', background: 'whitesmoke' }}>
            <Box
              flexBasis={'100%'}
              display={'flex'}
              justifyContent={'space-evenly '}
            >
              {statItem(
                statsToDisplay.overall.avgEliteOwnership + '%',
                'Avg Elite Ownership'
              )}{' '}
              {statItem(
                statsToDisplay.predicted.avgCleanSheetsPer90,
                'Avg Clean Sheets /  90'
              )}
            </Box>
          </CardContent>
        </Card>
        <Card>
          <CardContent style={{ maxHeight: '12vh', background: 'whitesmoke' }}>
            <Box
              flexBasis={'100%'}
              display={'flex'}
              justifyContent={'space-evenly '}
            >
              {statItem(
                statsToDisplay.predicted.avgExpectedGoalsPer90,
                'Avg Exp Goals /  90'
              )}
            </Box>
          </CardContent>
        </Card>
        <Card>
          <CardContent style={{ maxHeight: '12vh', background: 'whitesmoke' }}>
            <Box display={'flex'} flexWrap={'wrap'} flexDirection={'row'}>
              <Box
                flexBasis={'100%'}
                display="flex"
                alignItems={'center'}
                justifyContent={'space-evenly '}
              >
                {statItem(statsToDisplay.overall.avgGoals, 'Avg Goals')}
                {statItem(statsToDisplay.overall.avgAssists, 'Avg Assists')}
              </Box>
            </Box>
          </CardContent>
        </Card>
        <Card>
          <CardContent style={{ maxHeight: '12vh', background: 'whitesmoke' }}>
            <Box
              display={'flex'}
              flexWrap={'wrap'}
              flexDirection={'row'}
              justifyContent={'space-evenly '}
              alignItems={'center'}
            >
              {statItem(
                statsToDisplay.predicted.avgPrediction4GW,
                'Avg Prediction (4GW)'
              )}

              {statItem(
                statsToDisplay.predicted.avgWeightedPrediction,
                'Avg Weighted Prediction'
              )}
            </Box>
          </CardContent>
        </Card>
        <Card>
          <CardContent style={{ maxHeight: '12vh', background: 'whitesmoke' }}>
            <Box
              display={'flex'}
              flexWrap={'wrap'}
              flexDirection={'row'}
              justifyContent={'space-evenly'}
              alignItems={'center'}
            >
              {statItem(
                statsToDisplay.predicted.avgExpectedAssistsPer90,
                'Avg Exp Assists /  90'
              )}
              {statItem(
                statsToDisplay.predicted.avgPrediction4GW,
                'Avg Prediction (4GW)'
              )}
            </Box>
          </CardContent>
        </Card>
      </Slider>
      <Box
        position={'absolute'}
        zIndex={2}
        display={'flex'}
        bgcolor={'transparent'}
        gap={'5%'}
        width={{
          xs: '100%',
          sm: 'max-content',
          md: 'max-content',
          lg: 'max-content',
        }}
        sx={{ pointerEvents: 'none' }}
        justifyContent={'space-between'}
      >
        <Typography
          bgcolor={'whitesmoke'}
          style={{
            borderBottomLeftRadius: '25px',
            borderBottomRightRadius: '25px',
          }}
        >
          {statItem(state.teamCreationState.totalCount, 'Players')}
        </Typography>
        <Typography
          bgcolor={'whitesmoke'}
          style={{
            borderBottomLeftRadius: '25px',
            borderBottomRightRadius: '25px',
          }}
        >
          {statItem(state.teamCreationState.teamCost, 'Budget')}
        </Typography>
      </Box>
    </Box>
  );
};

export default TeamSummaryCarousel;
