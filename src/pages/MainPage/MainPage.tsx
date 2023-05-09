import * as React from 'react';
import style from './MainPage.module.scss';
import Menu from '../../components/Menu/Menu';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Playground from '../../components/Playground/Playground';

const MainPage = () => {
  interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }

  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role='tabpanel'
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={style.mainPage}>
      <Menu />
      <div className={style.playBlock}>
        <div className={style.playgroundBlock}>
          <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column-reverse' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }} >
              <Tabs value={value} onChange={handleChange} aria-label='basic tabs example'>
                <Tab label='Playground' {...a11yProps(0)} />
                <Tab label='Variables' {...a11yProps(1)} />
                <Tab label='Headers' {...a11yProps(2)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0} className={style.tabPanel} >
              <Playground />
            </TabPanel>
            <TabPanel value={value} index={1} className={style.tabPanel} >
              Variables
            </TabPanel>
            <TabPanel value={value} index={2} className={style.tabPanel} >
              Headers
            </TabPanel>
          </Box>
        </div>
        <div className={style.responseBlock}>111</div>
      </div>
    </div>
  );
};

export default MainPage;
