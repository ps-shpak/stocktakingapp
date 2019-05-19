import * as React from "react";
import { Route, Router, Switch, Redirect } from "react-router";
import { AppContext } from "../context";
import { EPaths } from "../config";
import DevTools from "mobx-react-devtools";
import { Users } from "../pages/users";
import { Property } from "../pages/property";
import "./App.css";
import { Sidebar } from "../containers/sidebar";

export class App extends React.Component {
  render() {
    return (
        <Router history={AppContext.getHistory()}>
            <div className={"App"}>
                <Sidebar />
                <DevTools position={"topRight"} />
                <Switch>
                    <Route exact={true} path={EPaths.MAIN} render={() => <Redirect to={EPaths.PROPERTY} />} />
                    <Route exact={true} path={EPaths.PROPERTY} component={Property} />
                    <Route exact={true} path={EPaths.USERS} component={Users} />
                </Switch>
            </div>
        </Router>
    );
  }
}
