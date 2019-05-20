import * as React from "react";
import { ReactNode, Component } from "react";
import { observer } from "mobx-react";
import { autobind } from "core-decorators";
import { IDashboardProps } from "./IDashboardProps";
import { DashboardView } from "./view";
import { AddProductPopup } from "../../components/add-product-popup";
import { EParams, EItemKind, EGroupingMethod } from "../../config";
import { ItemKind, ItemGroupingMethod } from "src/api";

@observer
@autobind
export class Dashboard extends Component<IDashboardProps> {
    componentDidMount(): void {
        const params = new URLSearchParams(this.props.location.search);
        this.props.store.reloadItems(this.parseItemKind(params), this.parseItemGroupingMethod(params));
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

    private parseItemKind(params: URLSearchParams): ItemKind {
        switch (params.get(EParams.ITEM_KIND) as EItemKind) {
            case EItemKind.EQUIPMENT:
                return ItemKind.Equipment;
            case EItemKind.LICENSE:
                return ItemKind.License;
            default:
                return ItemKind.Equipment;
        }
    }

    private parseItemGroupingMethod(params: URLSearchParams): ItemGroupingMethod {
        switch (params.get(EParams.ITEM_GROUPING) as EGroupingMethod) {
            case EGroupingMethod.BY_CATEGORY:
                return ItemGroupingMethod.ByCategory;
            case EGroupingMethod.BY_OWNER:
                return ItemGroupingMethod.ByOwner;
            default:
                return ItemGroupingMethod.ByCategory;
        }
    }
}
