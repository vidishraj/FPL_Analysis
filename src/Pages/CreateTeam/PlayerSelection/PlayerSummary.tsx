import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Player } from '../../../Types/DataType';
import { round } from '../CreateTeam';
import { iconSrc } from '../../../Icons/Icons';

interface PlayerDialogProps {
  open: boolean;
  onClose: () => void;
  player: Player | null;
}

const PlayerSummary: React.FC<PlayerDialogProps> = ({
  open,
  onClose,
  player,
}) => {
  if (!player) return null;

  const {
    team,
    fpl_ownership,
    elite_ownership,
    elite_ownership_change,
    data: {
      prediction4GW,
      formatted_cost,
      weighted_prediction,
      predictions,
      next_gw_xmins,
    },
    fpl,
  } = player;
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      {player !== null && (
        <>
          <DialogTitle>
            <IconButton
              aria-label="close"
              onClick={onClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: 'grey.500',
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              {/* Basic Information */}
              <Grid item xs={12} borderBottom={'1px solid grey'}>
                <Typography variant="body1" component="div">
                  {fpl.first_name} {fpl.second_name}{' '}
                  <img alt={'Team Logo'} src={iconSrc[team.name].logo}></img>
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  NEXT : {predictions[0].opp[0][1].toUpperCase()}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" component="div">
                  Ownership Data
                </Typography>
              </Grid>
              <Grid item xs={12} display={'flex'}>
                {/* Ownership Info */}
                <Grid item xs={6} md={4}>
                  <Typography variant="body2">
                    FPL Ownership: {fpl_ownership}%
                  </Typography>
                </Grid>
                <Grid item xs={6} md={4}>
                  <Typography variant="body2">
                    Elite Ownership: {elite_ownership}%
                  </Typography>
                </Grid>
                <Grid item xs={6} md={4}>
                  <Typography variant="body2">
                    Elite Ownership Change: {elite_ownership_change}%
                  </Typography>
                </Grid>
              </Grid>
              {/* FPL Data */}
              <Grid item xs={12} borderTop={'1px solid grey'}>
                <Typography variant="h6" component="div">
                  FPL Data
                </Typography>
              </Grid>
              <Grid item xs={12} display={'flex'}>
                <Grid item xs={6} md={4}>
                  <Typography variant="body2">Form: {fpl.form}</Typography>
                </Grid>
                <Grid item xs={6} md={4}>
                  <Typography variant="body2">
                    Minutes: {fpl.minutes}
                  </Typography>
                </Grid>
                <Grid item xs={6} md={4}>
                  <Typography variant="body2">
                    Goals Scored: {fpl.goals_scored}
                  </Typography>
                </Grid>
                <Grid item xs={6} md={4}>
                  <Typography variant="body2">
                    Assists: {fpl.assists}
                  </Typography>
                </Grid>
                <Grid item xs={6} md={4}>
                  <Typography variant="body2">
                    Clean Sheets: {fpl.clean_sheets}
                  </Typography>
                </Grid>
                <Grid item xs={6} md={4}>
                  <Typography variant="body2">
                    Total Points: {fpl.total_points}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={12} borderTop={'1px solid grey'}>
                <Typography variant="h6" component="div">
                  Player Data
                </Typography>
              </Grid>
              {/* Player Data */}
              <Grid
                display={'flex'}
                justifyContent={'space-evenly'}
                alignItems={'center'}
                width={'100%'}
              >
                <Grid item xs={6} md={4}>
                  <Typography variant="body2">
                    Current Cost: {formatted_cost}
                  </Typography>
                </Grid>
                <Grid item xs={6} md={4}>
                  <Typography variant="body2">
                    Predicted Points (Next 4 GWs): {round(prediction4GW, 1)}
                  </Typography>
                </Grid>
                <Grid item xs={6} md={4}>
                  <Typography variant="body2">
                    Weighted Prediction: {round(weighted_prediction, 1)}
                  </Typography>
                </Grid>
                <Grid item xs={6} md={4}>
                  <Typography variant="body2">
                    Next GW Expected Minutes: {next_gw_xmins}
                  </Typography>
                </Grid>
              </Grid>
              {/* Predictions */}
              <Table size="small" sx={{ borderTop: '1px solid grey' }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Gameweek (GW)</TableCell>
                    <TableCell>Opponent</TableCell>
                    <TableCell>Predicted Points</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {predictions.map((prediction, index) => (
                    <TableRow key={index}>
                      <TableCell>{prediction.gw}</TableCell>
                      <TableCell>
                        {prediction.opp
                          .map((o) => o[0])
                          .join(', ')
                          .toUpperCase()}
                      </TableCell>
                      <TableCell>
                        {round(prediction.predicted_pts, 1)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Grid>
          </DialogContent>
        </>
      )}
    </Dialog>
  );
};

export default PlayerSummary;
