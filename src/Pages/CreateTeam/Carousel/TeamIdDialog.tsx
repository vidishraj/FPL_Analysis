import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Typography,
  Box,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFplContext } from '../../../Contexts/context';
import { fetchTeam } from '../../../Api/Api';

const TeamIDDialog = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: any;
}) => {
  const [teamID, setTeamID] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { dispatch } = useFplContext();
  const addParamToUrl = (key: string, value: string) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set(key, value); // Add or update the parameter
    navigate(`${location.pathname}?${searchParams.toString()}`);
  };
  const removeParamFromUrl = (key: string) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.delete(key); // Remove the parameter by key
    return `${location.pathname}?${searchParams.toString()}`;
  };
  const handleSubmit = () => {
    // Handle submit logic
    console.log('Submitted Team ID:', teamID);
    if (teamID && teamID !== '') {
      addParamToUrl('team_Id', teamID);
      fetchTeam(teamID)
        .then((response) => {
          if (Array.isArray(response.data)) {
            dispatch({
              type: 'SET_TEAM_TABLE',
              payload: response.data,
            });
            dispatch({
              type: 'SET_TEAM',
              payload: teamID,
            });
          }
        })
        .catch((err) => {
          dispatch({
            type: 'SET_TEAM_TABLE',
            payload: [],
          });
          const path = removeParamFromUrl('team_Id');
          localStorage.removeItem('teamID');
          navigate(path);
          console.log('error fetching team', err);
        })
        .finally(() => {});
    }

    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Enter Team ID</DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          {/* Team ID Input */}
          <TextField
            label="Team ID"
            variant="outlined"
            inputProps={{ maxLength: 10 }}
            value={teamID}
            onChange={(e) => setTeamID(e.target.value.slice(0, 10))}
            type="number"
            placeholder="Enter your Team ID"
            fullWidth
          />
          <Typography variant="caption" color="textSecondary" align="left">
            *6398611 for VR
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        {/* Cancel Button */}
        <Button onClick={handleClose} color="secondary" variant="outlined">
          Cancel
        </Button>
        {/* Submit Button */}
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TeamIDDialog;
