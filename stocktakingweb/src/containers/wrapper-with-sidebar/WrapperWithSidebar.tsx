import * as React from "react";
import { Component, CSSProperties, ReactNode } from "react";
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
        const style: CSSProperties = {
            width: "calc(100% - 300px)"
        };
        return (
            <Wrapper title={this.props.title}>
                <Sidebar />
                <div style={style}>
                    {this.props.children}
                </div>
            </Wrapper>
        );
    }

    onOpen(index: number): void {
        this.store.onOpenOptions(index);
        attempt(this.props.onOpenOptions!, index);
    }

    onChangeActive(rowIndex: number, subRowIndex: number): void {
        this.store.onChangeActiveMenuItem(rowIndex, subRowIndex);
        attempt(this.props.onChangeActive!, rowIndex, subRowIndex);
    }
}
