import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

// import About from "./About/About";
import Tables from "./Tables/Tables";

import Login from "./Login/Login";
import history from './history';
import FaceCounter from "./FaceCounter/FaceCounter";

export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={Login} />
                    <Route path="/FaceCounter" component={FaceCounter} />
                    <Route path="/Tables" component={Tables} />
                     
                </Switch>
            </Router>
        )
    }
}
