import * as React from "react";
import { Component, ReactNode } from "react";
import { autobind } from "core-decorators";
import { observer } from "mobx-react";
import { Dashboard } from "../../containers/dashboard";
import { MainStore } from "./MainStore";
import { Wrapper } from "../../containers/wrapper";

@observer
@autobind
export class Main extends Component {
    private readonly store = new MainStore();

    render(): ReactNode {
        return (
            <Wrapper title={"Инвентаризация"}>
                <Dashboard
                    store={this.store.dashboardStore}
                    onCloseTree={this.store.onCloseTree}
                />
            </Wrapper>
        );
    }
}
