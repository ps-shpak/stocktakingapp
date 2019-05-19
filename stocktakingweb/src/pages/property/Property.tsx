import * as React from "react";
import { Component, ReactNode } from "react";
import { autobind } from "core-decorators";
import { observer } from "mobx-react";
import { Dashboard } from "../../containers/dashboard";
import { PropertyStore } from "./PropertyStore";
import { Wrapper } from "../../containers/wrapper";
import { RouteComponentProps } from "react-router";

@observer
@autobind
export class Property extends Component<RouteComponentProps> {
    private readonly store = new PropertyStore();

    render(): ReactNode {
        return (
            <Wrapper title={"Имущество"}>
                <Dashboard
                    history={this.props.history}
                    match={this.props.match}
                    location={this.props.location}
                    store={this.store.dashboardStore}
                    onCloseTree={this.store.onCloseTree}
                />
            </Wrapper>
        );
    }
}
