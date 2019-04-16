import * as React from "react";
import { ReactNode, Component } from "react";
import { observer } from "mobx-react";
import { autobind } from "core-decorators";
import { DashboardStore } from "./DashboardStore";
import { DashboardController } from "./DashboardController";
import { Tree } from "../../components/tree";
import { IDashboardProps } from "./IDashboardProps";
import { AddProductPopup } from "../../components/add-product-popup";

@observer
@autobind
export class Dashboard extends Component<IDashboardProps> {
    private readonly store = new DashboardStore();
    private readonly controller = new DashboardController(this.store);

    componentDidMount(): void {
        this.controller.onMount();
        this.store.isPopupVisible = true;
    }

    render(): ReactNode {
        return (
            <>
                <AddProductPopup
                    isVisible={this.store.isPopupVisible}
                    onClose={this.controller.onClosePopup}
                />
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
