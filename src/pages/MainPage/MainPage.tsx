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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { CircularProgress, useMediaQuery } from '@mui/material';
import { VarObject } from '../../types/Types.tsx';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import TerminalOutlinedIcon from '@mui/icons-material/TerminalOutlined';
import CustomizedAccordions from '../../components/Accordion/Accordion.tsx';
const Docs = React.lazy(() => import('../../components/Docs/Docs.tsx'));

const MainPage = () => {
  const { user, loading } = useAuth();
  const history = useNavigate();

  React.useEffect(() => {
    if (!loading && !user) history('/welcome');
  }, [user, loading]);
  interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }
  const theme = createTheme({
    components: {
      MuiTabs: {
        styleOverrides: {
          flexContainer: {
            justifyContent: 'space-between',
          },
          indicator: {
            backgroundColor: 'black',
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            minWidth: 0,
            padding: 0,
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

  const [query, setQuery] = useState<string>(`{
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
  const [variables, setVariables] = useState<VarObject[] | []>([]);
  const [response, setResponse] = useState<string | null>(null);
  const [expandedAccordion, setExpandedAccordion] = useState<string | false>(false);

  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        className={style.tabPanel}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ display: 'flex', padding: '10px' }}>
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

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const mediumViewport = useMediaQuery('(min-width:760px)');
  return (
    <div className={style.mainPage}>
      <div className={style.playBlock}>
        <Box className={style.tabPanel}>
          <ThemeProvider theme={theme}>
            <Box className={style.tabsPanel}>
              <Tabs
                orientation={mediumViewport ? 'vertical' : 'horizontal'}
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
              >
                <Tab label={<TerminalOutlinedIcon />} {...a11yProps(0)} />
                <Tab label={<LibraryBooksOutlinedIcon />} {...a11yProps(1)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <div className={style.playgroundBlockContainer}>
                <div className={style.playgroundBlock}>
                  <div className={style.variablesBlock}>
                    <Playground query={query} setQuery={setQuery} />
                    <Menu
                      query={query}
                      variables={variables}
                      setQuery={setQuery}
                      setResponse={setResponse}
                    />
                  </div>
                  <CustomizedAccordions
                    extandedAccordion={expandedAccordion}
                    setExpandedAccordion={setExpandedAccordion}
                    variables={variables}
                    setVariables={setVariables}
                  />
                </div>
                <div className={style.responseBlock}>
                  {response ? (
                    <JsonFormatter json={response} tabWith={4} jsonStyle={jsonStyle} />
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Suspense fallback={<CircularProgress />}>
                <Docs />
              </Suspense>
            </TabPanel>
          </ThemeProvider>
        </Box>
      </div>
    </div>
  );
};

export default MainPage;
