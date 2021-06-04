import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from '../shared/Header';
import Footer from '../shared/Footer';
import SignIn from '../Authorization/SignIn';
import SignUp from '../Authorization/SignUp';
import FlightsPage from '../Flights/FlightsPage';

function App() {
    return (
        <>
            <Header />
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