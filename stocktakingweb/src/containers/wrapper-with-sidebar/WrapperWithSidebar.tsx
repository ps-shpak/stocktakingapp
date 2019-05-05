import * as React from "react";
import { Component, ReactNode } from "react";
import { IWrapperWithSidebarProps } from "./IWrapperWithSidebarProps";
import { autobind } from "core-decorators";
import { Wrapper } from "../wrapper";
import { Sidebar } from "../sidebar";
import { WrapperWithSidebarStore } from "./WrapperWithSidebarStore";
import { observer } from "mobx-react";
import { attempt } from "lodash";

@observer
@autobind
export class WrapperWithSidebar extends Component<IWrapperWithSidebarProps> {
    private readonly store = new WrapperWithSidebarStore();

    componentDidMount(): void {
        this.store.onMount();
    }

    render(): ReactNode {
        return (
            <Wrapper title={this.props.title}>
                <Sidebar
                    data={this.store.getMenuData()}
                    onOpenOptions={this.onOpen}
                    onChangeActive={this.onChangeActive}
                />
                {this.props.children}
            </Wrapper>
        );
    }

    private onOpen(index: number): void {
        this.store.onOpenOptions(index);
        attempt(this.props.onOpenOptions!, index);
    }

    private onChangeActive(rowIndex: number, subRowIndex: number): void {
        this.store.onChangeActiveMenuItem(rowIndex, subRowIndex);
        attempt(this.props.onChangeActive!, rowIndex, subRowIndex);
    }
}
