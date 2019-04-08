import * as React from "react";
import { Component } from "react";
import { Wrapper } from "../../containers/wrapper";
import { Sidebar } from "../../containers/sidebar";
import { autobind } from "core-decorators";
import { observer } from "mobx-react";
import { Dashboard } from "../../containers/dashboard";

@observer
@autobind
export class Main extends Component {
    render(): React.ReactNode {
        return (
            <Wrapper>
                <Sidebar />
                <Dashboard />
            </Wrapper>
        );
    }
}
