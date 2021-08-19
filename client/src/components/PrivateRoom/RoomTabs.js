import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import AddRouteModal from './RoutesTab/AddRouteModal';
import Profile from './ProfileTab/Profile';
import UpdateRouteModal from './RoutesTab/UpdateRouteModal';
import MyCard from './RoutesTab/MyCard';
import RoutesContainer from './RoutesTab/RoutesContainer';
import PhotosContainer from './RoutesTab/PhotosContainer';//+ roma

function TabPanel(props) {
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
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    overflow: "hidden",
    overflow: "hidden",
  },
  profile: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    
  }
}));

export default function RoomTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Профиль" {...a11yProps(0)} />
          <Tab label="Мои маршруты" {...a11yProps(1)} />
          <Tab label="Фото" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel className={classes.profile} value={value} index={0}>
        <Profile/>
      </TabPanel>
      <TabPanel className={classes.wrapper} value={value} index={1}>
      <RoutesContainer />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <PhotosContainer />
      </TabPanel>
    </div>
  );
}
