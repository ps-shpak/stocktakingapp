import * as React from "react";
import { Route, Router, Switch } from "react-router";
import { AppContext } from "../context";
import { EPaths } from "../config";
import { Main } from "../pages/main";

export class App extends React.Component {
  render() {
    return (
        <Router history={AppContext.getHistory()}>
            <Switch>
                <Route exact={true} path={EPaths.MAIN} component={Main} />
            </Switch>
        </Router>
    );
  }
}
