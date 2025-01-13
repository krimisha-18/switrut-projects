import { Box, CircularProgress, Typography } from '@mui/material';

function LoadingSpinner({ message = 'Loading...' }) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="200px"
      gap={2}
    >
      <CircularProgress />
      <Typography color="text.secondary" variant="body2">
        {message}
      </Typography>
    </Box>
  );
}

export default LoadingSpinner; 