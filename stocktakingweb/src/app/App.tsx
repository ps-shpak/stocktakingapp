import * as React from "react";
import { Route, Router, Switch } from "react-router";
import { AppContext } from "../context";
import { EPaths } from "../config";
import { Main } from "../pages/main";
import DevTools from "mobx-react-devtools";
import { Users } from "../pages/users";

export class App extends React.Component {
  render() {
    return (
        <Router history={AppContext.getHistory()}>
            <>
                <DevTools />
                <Switch>
                    <Route exact={true} path={EPaths.MAIN} component={Main} />
                    <Route exact={true} path={EPaths.USERS} component={Users} />
                </Switch>
            </>
        </Router>
    );
  }
}
