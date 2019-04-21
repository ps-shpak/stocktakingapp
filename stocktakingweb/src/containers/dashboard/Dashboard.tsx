import * as React from "react";
import { ReactNode, Component } from "react";
import { observer } from "mobx-react";
import { autobind } from "core-decorators";
import { DashboardStore } from "./DashboardStore";
import { DashboardController } from "./DashboardController";
import { IDashboardProps } from "./IDashboardProps";
import { DashboardView } from "./view";

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
            <DashboardView
                treeData={this.store.treeData}
                isPopupVisible={this.store.isPopupVisible}
                isTreeVisible={this.props.isTreeVisible}
                treePosition={this.props.position}
                onCloseTree={this.props.onCloseTree}
                onChangeActiveTree={this.controller.onChangeActive}
                onClosePopup={this.controller.onClosePopup}
                onOpenPopup={this.controller.onOpenPopup}
            />
        );
    }
}
