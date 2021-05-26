import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from '../shared/header';
import Footer from '../shared/footer';
import SignIn from '../authorization/sign-in';
import SignUp from '../authorization/sign-up';
import FlightsPage from '../flights/flights-page';

import './app.css'

function App() {
    return (
        <>
            <Header/>
            <main>
                <Router>
                    <Switch>
                        <Route path="/SignIn">
                            <SignIn />
                        </Route>
                        <Route path="/SignUp">
                            <SignUp />
                        </Route>
                        <Route path="/">
                            <FlightsPage />
                        </Route>
                    </Switch>
                </Router>
            </main>
            <Footer/>
        </>
    );
}

export default App;