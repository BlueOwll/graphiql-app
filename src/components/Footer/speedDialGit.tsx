import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import GitHubIcon from '@mui/icons-material/GitHub';
import SpeedDialAction from '@mui/material/SpeedDialAction';

export default function SpeedDialGit(props) {
  const actions = [
    {
      icon: <GitHubIcon color="action" sx={{ fontSize: '30px' }} />,
      name: `${props.t('BlueOwll')}`,
      href: 'https://github.com/blueowll',
    },
    {
      icon: <GitHubIcon color="action" sx={{ fontSize: '30px' }} />,
      name: `${props.t('Roman Maklakow')}`,
      href: 'https://github.com/mclakov',
    },
    {
      icon: <GitHubIcon color="action" sx={{ fontSize: '30px' }} />,
      name: `${props.t('Roman Nevdah')}`,
      href: 'https://github.com/romzezzz',
    },
  ];
  return (
    <Box sx={{ position: 'absolute', bottom: '10px', right: '4px' }}>
      <SpeedDial
        FabProps={{
          size: 'medium',
        }}
        sx={{
          '& .MuiFab-primary': {
            backgroundColor: 'white',
            '&:hover': {
              backgroundColor: 'white',
            },
            '&:focus': {
              outline: 'none',
            },
          },
        }}
        ariaLabel="SpeedDial basic example"
        icon={
          <GitHubIcon
            sx={{
              color: 'grey',
              fontSize: '52px',
              '&:hover': {
                opacity: 0.8,
              },
            }}
          />
        }
      >
        {actions.map((action) => (
          <SpeedDialAction
            sx={{
              '&:focus': {
                outline: 'none',
              },
            }}
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipPlacement="left"
            onClick={() => {
              window.open(action.href, '_blank');
            }}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
