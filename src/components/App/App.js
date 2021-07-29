import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import { useSelector } from 'react-redux';

import AdminPanel from 'components/Admin/AdminPanel';
import Header from 'components/shared/Header';
import Footer from 'components/shared/Footer';
import SignIn from 'components/Authorization/SignIn';
import SignUp from 'components/Authorization/SignUp';
import AccountPage from 'components/AccountPage';
import MyCompanyPage from 'components/MyCompanyPage';
import FlightsPage from 'components/Flights/FlightsPage';
import AdminUsersPage from 'components/Admin/AdminPages/AdminUsersPage';
import AdminCompaniesPage from 'components/Admin/AdminPages/AdminCompaniesPage';
import AdminFlightsPage from 'components/Admin/AdminPages/AdminFlightsPage';
import AirplaneCreationPage from 'components/AirplaneCreationPage';
import FLightReservationPage from 'components/FlightReservationPage';
import Notifications from 'components/Notifications';
import { getRole } from 'services/token-service';
import AdminAirplanesPage from 'components/Admin/AdminPages/AdminAirplanesPage/AdminAirplanesPage';
import {
  AdminApp,
  Admin, 
  User
} from 'constants/appRoles';
import CustomRoute from 'components/CustomRoute';

const useStyles = makeStyles((theme) => ({
  main: {
    display: 'flex',
  },
  mainPage: {
    display: 'flex',
    width: '100%',
    padding: '25px',
  },
  toolBar: theme.mixins.toolbar,
}));

const AdminAppOpportunities = [AdminApp];
const AdminOpportunities = [AdminApp, Admin];
const UserOportunities = [AdminApp, Admin, User]

function App() {
  const token = useSelector((state) => state.token);
  const classes = useStyles();

  const [role, setRole] = useState('');

  useEffect(() => {
    setRole(getRole(token.jwtToken));
  }, [token.jwtToken]);

  return (
    <Router>
      <Header />
      <main className={classes.main}>
        <div className={classes.mainPage}>
          {role === AdminApp ? <AdminPanel /> : <></>}
          <Container>
            <div className={classes.toolBar}></div>
            <Switch>
              <Route path="/SignIn">
                <SignIn />
              </Route>
              <Route path="/SignUp">
                <SignUp />
              </Route>
              <CustomRoute 
                path="/admin/users"
                requiredRoles={AdminAppOpportunities}
              >
                <AdminUsersPage />
              </CustomRoute>
              <CustomRoute 
                path="/admin/companies"
                requiredRoles={AdminAppOpportunities}
              >
                <AdminCompaniesPage />
              </CustomRoute>
              <CustomRoute 
                path="/admin/airplanes/creation"
                requiredRoles={AdminAppOpportunities}
              >
                <AirplaneCreationPage />
              </CustomRoute>
              <CustomRoute 
                path="/admin/airplanes"
                requiredRoles={AdminAppOpportunities}
              >
                <AdminAirplanesPage />
              </CustomRoute>
              <CustomRoute 
                path="/admin/flights"
                requiredRoles={AdminAppOpportunities}
              >
                <AdminFlightsPage />
              </CustomRoute>
              <CustomRoute 
                path="/account"
                requiredRoles={UserOportunities}
              >
                <AccountPage />
              </CustomRoute>
              <CustomRoute 
                path="/myCompany"
                requiredRoles={AdminOpportunities}
              >
                <MyCompanyPage />
              </CustomRoute>
              <Route path="/reservation">
                <FLightReservationPage />
              </Route>
              <Route exact path="/">
                <FlightsPage />
              </Route>
            </Switch>
          </Container>
          <Notifications />
        </div>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
