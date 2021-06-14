import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';

import AdminPanel from 'components/Admin/AdminPanel';
import Header from 'components/shared/Header';
import Footer from 'components/shared/Footer';
import SignIn from 'components/Authorization/SignIn';
import SignUp from 'components/Authorization/SignUp';
import FlightsPage from 'components/Flights/FlightsPage';
import AdminUsersPage from 'components/Admin/AdminPages/AdminUsersPage';
import AdminCompaniesPage from 'components/Admin/AdminPages/AdminCompaniesPage';
import AdminFlightsPage from 'components/Admin/AdminPages/AdminFlightsPage';
import { getEmail, getRole } from 'services/token-service';
import AdminAirplanesPage from '../Admin/AdminPages/AdminAirplanesPage/AdminAirplanesPage';
import { Container } from '@material-ui/core';

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

function App() {
  const token = useSelector((state) => state.token);
  const classes = useStyles();

  const [role, setRole] = useState('');

  useEffect(() => {
    setRole(getRole(token.jwtToken));
  }, [token.jwtToken]);

  return (
    <>
      <Router>
        <Header />
        <main className={classes.main}>
          <div className={classes.mainPage}>
            {role === 'AdminApp' ? <AdminPanel /> : <></>}
            <Container>
              <div className={classes.toolBar}></div>
              <Switch>
                <Route path="/SignIn">
                  <SignIn />
                </Route>
                <Route path="/SignUp">
                  <SignUp />
                </Route>
                <Route path="/admin/users">
                  <AdminUsersPage />
                </Route>
                <Route path="/admin/companies">
                  <AdminCompaniesPage />
                </Route>
                <Route path="/admin/airplanes">
                  <AdminAirplanesPage />
                </Route>
                <Route path="/admin/flights">
                  <AdminFlightsPage />
                </Route>
                <Route path="/">
                  <FlightsPage />
                </Route>
              </Switch>
            </Container>
          </div>
        </main>
        <Footer />
      </Router>
    </>
  );
}

export default App;
