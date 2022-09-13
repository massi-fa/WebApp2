import * as React from 'react';
import Select from 'react-select';
import axios from 'axios';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { mainListItems, secondaryListItems } from './listItems';
import Chart from './Chart';

/* eslint-disable react/jsx-props-no-spreading */
const Copyright = (props) => {
  <Typography variant="body2" color="text.secondary" align="center" {...props}>
    {'Copyright © '}
    <Link color="inherit" href="https://mui.com/">
      Your Website
    </Link>
    {' '}
    {new Date().getFullYear()}
    .
  </Typography>;
};

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();

const DashboardContent = () => {
  const [thingNames, setThingNames] = React.useState([]);
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  function toCorrectFormat(x) {
    return { value: x, label: x };
  }
  const onRequestNameThings = () => {
    // send thing name to server
    console.log('Thing trovate');
    axios.get('/get_lista_things')
      .then((res) => {
        // mapping to scrolling list
        setThingNames(res.data.map((x) => toCorrectFormat(x)));
      });
    console.log(thingNames);
  };
  const [selectedOption, setSelectedOption] = React.useState({ value: '', label: 'Nessuna Thing selezionata' });
  const options = [
    { value: '10', label: '10' },
    { value: '20', label: '20' },
    { value: '100000000', label: 'Tutti' },
  ];
  const [selectedOptionNumber, setSelectedOptionNumber] = React.useState({ value: '10', label: '10' });
  React.useEffect(() => {
    if (thingNames.length === 0) {
      onRequestNameThings();
    }
  }, [thingNames]);
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    // const selectedThingCorpus = selectedThing.selectedThing;
    axios.get('/temperature', {
      params: {
        product: selectedOptionNumber.value,
        thingName: selectedOption.value,
      },
    })
      .then((res) => {
        setData(res.data);
      });
  }, [selectedOption, selectedOptionNumber]);
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) => (
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900]
            ),
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={6}>
              <Grid item xs={10} md={6}>
                <Select
                  defaultValue={selectedOption}
                  onChange={setSelectedOption}
                  options={thingNames}
                />
              </Grid>
              <Grid item xs={10} md={6}>
                <Select
                  defaultValue={selectedOptionNumber}
                  onChange={setSelectedOptionNumber}
                  options={options}
                />
              </Grid>
              {/* Chart */}
              <Grid container spacing={4} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={10} md={12}>
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      height: 240,
                    }}
                  >
                    <Chart
                      data={data}
                      target="humidity"
                    />
                  </Paper>
                </Grid>
                <Grid item xs={10} md={12}>
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      height: 240,
                    }}
                  >
                    <Chart
                      data={data}
                      target="temperature"
                    />
                  </Paper>
                </Grid>
                <Grid item xs={10} md={12}>
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      height: 240,
                    }}
                  >
                    <Chart
                      data={data}
                      target="light"
                    />
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default DashboardContent;
