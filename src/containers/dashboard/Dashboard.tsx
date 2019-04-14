import * as React from "react";
import { ReactNode, Component } from "react";
import { Popup } from "../../components/popup";
import { observer } from "mobx-react";
import { autobind } from "core-decorators";
import { DashboardStore } from "./DashboardStore";
import { DashboardController } from "./DashboardController";
import { Tree } from "../../components/tree";
import { IDashboardProps } from "./IDashboardProps";

@observer
@autobind
export class Dashboard extends Component<IDashboardProps> {
    private readonly store = new DashboardStore();
    private readonly controller = new DashboardController(this.store);

    componentDidMount(): void {
        this.controller.onMount();
    }

    render(): ReactNode {
        return (
            <>
                <Popup title={"123"} />
                <Tree
                    data={this.props.tree}
                    onChangeActive={this.controller.onChangeActive}
                    position={this.props.position}
                    isVisible={this.props.isTreeVisible}
                    onCloseTree={this.props.onCloseTree}
                />
            </>
        );
    }
}
