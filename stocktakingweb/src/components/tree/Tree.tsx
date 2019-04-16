import * as React from "react";
import { Component, ReactNode } from "react";
import { autobind } from "core-decorators";
import { ITreeProps } from "./ITreeProps";
import { TreeView } from "../tree-view";
import { SidebarStore } from "../../containers/sidebar/SidebarStore";

@autobind
export class Tree extends Component<ITreeProps> {
    private readonly store = new SidebarStore();

    componentDidMount(): void {
        this.store.isTreeVisible = this.props.isVisible;
    }

    componentWillReceiveProps(nextProps: Readonly<ITreeProps>): void {
        this.store.isTreeVisible = nextProps.isVisible;
    }

    render(): ReactNode {
        return this.getContent();
    }

    private getContent(): ReactNode {
        if (this.store.isTreeVisible) {
            return (
                <TreeView
                    data={this.props.data}
                    onChangeActive={this.props.onChangeActive}
                    position={this.props.position}
                    onCloseTree={this.props.onCloseTree}
                />
            );
        } else {
            return (<></>);
        }
    }
}
