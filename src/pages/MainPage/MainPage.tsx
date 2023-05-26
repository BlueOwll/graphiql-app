import * as React from 'react';
import { Suspense } from 'react';
import JsonFormatter from 'react-json-formatter';
import style from './MainPage.module.scss';
import Menu from '../../components/Menu/Menu';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Playground from '../../components/Playground/Playground';
import { useState } from 'react';
import Variables from '../../components/Variables/Variables';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
const Docs = React.lazy(() => import('../../components/Docs/Docs.tsx'));

const MainPage = () => {
  const { user } = useAuth();
  const history = useNavigate();

  React.useEffect(() => {
    if (!user) history('/');
  }, [user]);
  interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }
  const theme = createTheme({
    components: {
      MuiTabs: {
        styleOverrides: {
          indicator: {
            backgroundColor: 'black',
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            fontFamily: '"system-ui", sans-serif',
            '&.Mui-selected': {
              color: 'black',
            },
            '&:focus': {
              outline: 'none',
            },
          },
        },
      },
    },
  });

  const jsonStyle = {
    propertyStyle: { color: 'red' },
    stringStyle: { color: 'green' },
    numberStyle: { color: 'darkorange' },
  };

  const [query, setQuery] = useState(`{
  characters(page: 2, filter: {name: "rick"}) {
    info {
      count
    }
    results {
      name
    }
  }
  location(id: 1) {
    id
  }
  episodesByIds(ids: [1, 2]) {
    id
  }
}`);
  const [variables, setVariables] = useState([]);
  const [response, setResponse] = useState(null);

  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography component={'div'}>{children}</Typography>
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
      <Menu
        query={query}
        variables={variables}
        setQuery={setQuery}
        setVariables={setVariables}
        setResponse={setResponse}
      />
      <div className={style.playBlock}>
        <div className={style.playgroundBlock}>
          <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column-reverse' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <ThemeProvider theme={theme}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                  <Tab label="Playground" {...a11yProps(0)} />
                  <Tab
                    label={
                      <div>
                        <Typography
                          fontFamily={'inherit'}
                          fontWeight={'inherit'}
                          fontSize={'14px'}
                          component="span"
                        >
                          Variables{' '}
                        </Typography>
                        {variables.length ? (
                          <span style={{ color: 'red', fontSize: '16px' }}>{variables.length}</span>
                        ) : (
                          <></>
                        )}
                      </div>
                    }
                    {...a11yProps(1)}
                  />
                  <Tab label="Docs" {...a11yProps(2)} />
                </Tabs>
              </ThemeProvider>
            </Box>
            <TabPanel value={value} index={0} className={style.tabPanel}>
              <Playground query={query} setQuery={setQuery} />
            </TabPanel>
            <TabPanel value={value} index={1} className={style.tabPanel}>
              <Variables variables={variables} setVariables={setVariables} />
            </TabPanel>
            <TabPanel value={value} index={2} className={style.tabPanel}>
              <Suspense fallback={<CircularProgress />}>
                <Docs />
              </Suspense>
            </TabPanel>
          </Box>
        </div>
        <div className={style.responseBlock}>
          {response ? (
            <JsonFormatter json={response} tabWith={4} jsonStyle={jsonStyle} />
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
