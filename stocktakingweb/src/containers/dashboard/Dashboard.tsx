import * as React from "react";
import { ReactNode, Component } from "react";
import { observer } from "mobx-react";
import { autobind } from "core-decorators";
import { IDashboardProps } from "./IDashboardProps";
import { DashboardView } from "./view";

@observer
@autobind
export class Dashboard extends Component<IDashboardProps> {
    componentDidMount(): void {
        this.props.store.onMount();
    }

    render(): ReactNode {
        return (
            <DashboardView
                treeData={this.props.store.treeData}
                isPopupVisible={this.props.store.isPopupVisible}
                isTreeVisible={this.props.store.isTreeVisible}
                onCloseTree={this.props.onCloseTree}
                onChangeActiveTree={this.props.store.onChangeActive}
                onClosePopup={this.props.store.onClosePopup}
                onOpenPopup={this.props.store.onOpenPopup}
            />
        );
    }
}
