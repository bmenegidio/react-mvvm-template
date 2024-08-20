import { Skeleton, Stack } from '@mui/material';

const CircularProgress = () => <Skeleton variant="circular" width={40} height={40} />;

const TextProgress = ({ width = '100%' }: { width?: string }) => (
  <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={width} />
);

export const Loading = () => (
  <Stack flexDirection={'column'} spacing={2}>
    <Stack flexDirection={'row'} alignItems={'center'}>
      <CircularProgress />
      <Stack flexDirection={'column'} flexGrow={1} ml={2}>
        <TextProgress width={'98%'} />
        <TextProgress />
      </Stack>
    </Stack>

    <Stack flexDirection={'row'} alignItems={'center'}>
      <CircularProgress />
      <Stack flexDirection={'column'} flexGrow={1} ml={2}>
        <TextProgress width={'95%'} />
        <TextProgress width={'70%'} />
      </Stack>
    </Stack>
  </Stack>
);
