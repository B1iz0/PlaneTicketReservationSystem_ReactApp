import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector } from 'react-redux'

import AdminPanel from 'components/Admin/AdminPanel'
import Header from 'components/shared/Header'
import Footer from 'components/shared/Footer'
import SignIn from 'components/Authorization/SignIn'
import SignUp from 'components/Authorization/SignUp'
import FlightsPage from 'components/Flights/FlightsPage'
import AdminUsersPage from 'components/Admin/AdminPages/AdminUsersPage'
import AdminCompaniesPage from 'components/Admin/AdminPages/AdminCompaniesPage'
import AdminFlightsPage from 'components/Admin/AdminPages/AdminFlightsPage'
import { getEmail } from 'services/token-service'
import AdminAirplanesPage from '../Admin/AdminPages/AdminAirplanesPage/AdminAirplanesPage'

const useStyles = makeStyles((theme) => ({
  main: {
    display: 'flex',
  },
  mainPage: {
    width: '100%',
    padding: '25px',
  },
}))

function App() {
  const token = useSelector((state) => state.token)
  const classes = useStyles()

  const [userEmail, setUserEmail] = useState('')

  useEffect(() => {
    setUserEmail(getEmail(token.jwtToken))
  }, [token.jwtToken])

  return (
    <>
      <Header />
      <main className={classes.main}>
        {userEmail ? <AdminPanel /> : <></>}
        <div className={classes.mainPage}>
          <Router>
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
          </Router>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default App
