import { Box, Typography, Button } from '@mui/material';

// Player card component
export const EmptyPlayerCard = ({ addHandler }: { addHandler: any }) => {
  return (
    <Box
      sx={{
        borderRadius: '10px',
        border: '1px solid #ddd',
        textAlign: 'center',
        minWidth: { xs: 60, sm: 60, md: 75, lg: 85 },
        minHeight: { xs: 82, sm: 86, md: 90, lg: 95 },
        backgroundColor: '#fff',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)', // Fix shadow typo
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', // Center align text and button inside the box
        justifyContent: 'center',
        transition: 'all 0.3s ease', // Smooth resizing transitions
      }}
    >
      <Typography textOverflow={'ellipsis'} variant="caption">
        Add Player
      </Typography>
      <Button
        onClick={addHandler}
        sx={{
          marginTop: '8px',
          fontSize: '10px',
          padding: '2px 4px', // Make button smaller to fit inside
        }}
      >
        Add
      </Button>
    </Box>
  );
};
