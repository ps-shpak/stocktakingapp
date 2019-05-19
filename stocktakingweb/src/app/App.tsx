import * as React from "react";
import { Route, Router, Switch } from "react-router";
import { AppContext } from "../context";
import { EPaths } from "../config";
import { Main } from "../pages/main";
import DevTools from "mobx-react-devtools";
import { Licences } from "../pages/licences";
import { Property } from "../pages/property";
import "./App.css";
import { Sidebar } from "../containers/sidebar";
import { Users } from "../pages/users";

export class App extends React.Component {
 render() {
    return (
        <Router history={AppContext.getHistory()}>
            <div className={"App"}>
                <Sidebar />
                <DevTools position={"topRight"} />
                <Switch>
                    <Route exact={true} path={EPaths.MAIN} component={Main} />
                    <Route exact={true} path={EPaths.USERS} component={Users} />
                    <Route exact={true} path={EPaths.LICENSE} component={Licences} />
                    <Route exact={true} path={EPaths.PROPERTY} component={Property} />
                </Switch>
            </div>
        </Router>
    );
  }
}
