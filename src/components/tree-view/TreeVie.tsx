import withStyles from "@material-ui/core/styles/withStyles";
import { styles } from "./styles";
import * as React from "react";
import { Component, ReactNode } from "react";
import { ITreeViewProps } from "./ITreeViewProps";
import { ITreeItem } from "../tree";
import { TreeLine } from "./tree-line";

export const TreeView = withStyles(styles)(
    class extends Component<ITreeViewProps> {
        render(): ReactNode {
            return (
                <div className={this.props.classes.wrapper}>
                    {this.getList()}
                </div>
            );
        }

        private getList(): ReactNode {
            return (
                this.props.data.map((item: ITreeItem) => {
                    return <TreeLine data={item} onChangeActive={this.props.onChangeActive} key={item.id} />;
                })
            );
        }
    }
);
