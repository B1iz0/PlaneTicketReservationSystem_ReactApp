import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import { getCompanyId } from 'services/token-service';
import { getCompany } from 'api/apiRequests';

import CompanyAirportsTable from './CompanyAirportsTable';
import CompanyAirplanesTable from './CompanyAirplanesTable';

const useStyles = makeStyles((theme) => ({
  companyInfo: {
    marginBottom: theme.spacing(3),
  },
  largeAvatar: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
  userEmail: {
    alignSelf: 'flex-end',
  },
  userName: {
    alignSelf: 'flex-start',
  },
  userNameText: {
    fontSize: 'large',
  },
}));

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};

const MyCompanyPage = () => {
  const classes = useStyles();
  const token = useSelector((state) => state.token);

  const [company, setCompany] = useState(null);
  const [currentTab, setCurrentTab] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const companyId = getCompanyId(token.jwtToken);
      const [companyResponse, error] = await getCompany(companyId);
      if (companyResponse) {
        setCompany(companyResponse);
      }
      if (error) {
        // handle error
      }
    };

    fetchData();
  }, [token]);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <>
      <Typography gutterBottom variant="h2">
        My company
      </Typography>
      <div className={classes.companyInfo}>
        <Grid container justify="center" spacing={2}>
          <Grid item lg={2}>
            <Avatar alt="test" className={classes.largeAvatar} />
          </Grid>
          <Grid item lg={6}>
            <Typography variant="h3">{company?.name}</Typography>
          </Grid>
        </Grid>
      </div>
      <Paper elevation={4}>
        <Paper variant="outlined">
          <Tabs
            centered
            value={currentTab}
            indicatorColor="primary"
            textColor="primary"
            onChange={handleTabChange}
            aria-label="disabled tabs example"
          >
            <Tab label="Airports" />
            <Tab label="Airplanes" />
          </Tabs>
        </Paper>
        <TabPanel value={currentTab} index={0}>
          <CompanyAirportsTable company={company} />
        </TabPanel>
        <TabPanel value={currentTab} index={1}>
          <CompanyAirplanesTable companyName={company?.name} />
        </TabPanel>
      </Paper>
    </>
  );
};

export default MyCompanyPage;
