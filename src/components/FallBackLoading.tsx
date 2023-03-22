import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function FallbackLoading() {
  return (
    <Box
      sx={{
        width: '100%',
        height: ' 85vh',
        display: 'grid',
        placeItems: 'center',
      }}
    >
      <CircularProgress color="primary" size={50} thickness={4} />
    </Box>
  );
}