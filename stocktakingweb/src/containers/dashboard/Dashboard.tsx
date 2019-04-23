import * as React from "react";
import { ReactNode, Component } from "react";
import { observer } from "mobx-react";
import { autobind } from "core-decorators";
import { DashboardStore } from "./DashboardStore";
import { IDashboardProps } from "./IDashboardProps";
import { DashboardView } from "./view";

@observer
@autobind
export class Dashboard extends Component<IDashboardProps> {
    private readonly store = new DashboardStore();

    componentDidMount(): void {
        this.store.onMount();
    }

    render(): ReactNode {
        return (
            <DashboardView
                treeData={this.store.treeData}
                isPopupVisible={this.store.isPopupVisible}
                isTreeVisible={this.props.isTreeVisible}
                onCloseTree={this.props.onCloseTree}
                onChangeActiveTree={this.store.onChangeActive}
                onClosePopup={this.store.onClosePopup}
                onOpenPopup={this.store.onOpenPopup}
            />
        );
    }
}
