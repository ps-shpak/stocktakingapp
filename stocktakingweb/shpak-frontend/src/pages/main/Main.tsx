import * as React from "react";
import { Component } from "react";
import { Wrapper } from "../../containers/wrapper";
import { Sidebar } from "../../containers/sidebar";
import { autobind } from "core-decorators";
import { observer } from "mobx-react";

@observer
@autobind
export class Main extends Component {
    render(): React.ReactNode {
        return (
            <Wrapper>
                <Sidebar />
            </Wrapper>
        );
    }
}
