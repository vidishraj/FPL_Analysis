import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  Button,
  Box,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { ReactComponent as Logo } from '../Icons/logo.svg';
import { ReactComponent as LogoWritten } from '../Icons/logoWritten.svg';
import { useFplContext } from '../Contexts/context';
import './Header.scss';

export const Header = () => {
  const { dispatch } = useFplContext();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => {
    setDrawerOpen(open);
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{ backgroundColor: '#37003c', height: '50px' }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Box>
            <Logo
              style={{
                height: '35px',
                width: 'auto',
                borderRadius: '25px',
              }}
            />
            <LogoWritten
              style={{
                height: '30px',
                padding: 0,
                marginLeft: '10px',
                width: 'auto',
              }}
            />
          </Box>

          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
            }}
          >
            <Button
              color="inherit"
              className="custom-button"
              onClick={() => dispatch({ type: 'SET_GLOBAL_PAGE' })}
            >
              All Players
            </Button>
            <Button
              color="inherit"
              className="custom-button"
              onClick={() => dispatch({ type: 'SET_TEAMS_PAGE' })}
            >
              Connect FPL team
            </Button>
            <Button
              color="inherit"
              className="custom-button"
              onClick={() => dispatch({ type: 'SET_LEAGUE_PAGE' })}
            >
              Connect FPL league
            </Button>
            <Button
              color="inherit"
              className="custom-button"
              onClick={() => dispatch({ type: 'SET_LIVE_LEAGUE_PAGE' })}
            >
              Live FPL league
            </Button>
            <Button
              color="inherit"
              className="custom-button"
              onClick={() => dispatch({ type: 'SET_CREATE_TEAM_PAGE' })}
            >
              Create Team
            </Button>
          </Box>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            sx={{ display: { xs: 'block', md: 'none' } }}
            onClick={() => toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => toggleDrawer(false)}
      >
        <Box
          sx={{
            width: 250,
            display: 'flex',
            flexDirection: 'column',
            padding: '16px',
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="close"
            onClick={() => toggleDrawer(false)}
            sx={{ alignSelf: 'flex-end' }}
          >
            <CloseIcon />
          </IconButton>
          <Button
            color="inherit"
            className="custom-button"
            onClick={() => {
              dispatch({ type: 'SET_GLOBAL_PAGE' });
              toggleDrawer(false);
            }}
          >
            All Players
          </Button>
          <Button
            color="inherit"
            className="custom-button"
            onClick={() => {
              dispatch({ type: 'SET_TEAMS_PAGE' });
              toggleDrawer(false);
            }}
          >
            Connect FPL team
          </Button>
          <Button
            color="inherit"
            className="custom-button"
            onClick={() => {
              dispatch({ type: 'SET_LEAGUE_PAGE' });
              toggleDrawer(false);
            }}
          >
            Connect FPL league
          </Button>
          <Button
            color="inherit"
            className="custom-button"
            onClick={() => {
              dispatch({ type: 'SET_LIVE_LEAGUE_PAGE' });
              toggleDrawer(false);
            }}
          >
            Live FPL league
          </Button>{' '}
          <Button
            color="inherit"
            className="custom-button"
            onClick={() => {
              dispatch({ type: 'SET_CREATE_TEAM_PAGE' });
              toggleDrawer(false);
            }}
          >
            Create Team
          </Button>
        </Box>
      </Drawer>
    </>
  );
};
