import * as React from "react";
import { ReactNode, Component } from "react";
import { observer } from "mobx-react";
import { autobind } from "core-decorators";
import { IDashboardProps } from "./IDashboardProps";
import { DashboardView } from "./view";
import { AddProductPopup } from "../../components/add-product-popup";

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
                isTreeVisible={this.props.store.isTreeVisible}
                onCloseTree={this.props.onCloseTree}
                onChangeActiveTree={this.props.store.onChangeActive}
                createAddProductPopup={this.createAddProductPopup}
                showAddProductPopup={this.props.store.showAddProductPopup}
            />
        );
    }

    createAddProductPopup(): ReactNode {
        return (
            <AddProductPopup
                store={this.props.store.addProductStore}
            />
        );
    }
}
