import * as React from "react";
import { Component, ReactNode } from "react";
import { autobind } from "core-decorators";
import { ITreeProps } from "./ITreeProps";
import { TreeView } from "../tree-view";

@autobind
export class Tree extends Component<ITreeProps> {
    render(): ReactNode {
        return (
            <TreeView
                data={this.props.data}
                onChangeActive={this.props.onChangeActive}
                onOpen={this.props.onOpen}
            />
        );
    }
}
