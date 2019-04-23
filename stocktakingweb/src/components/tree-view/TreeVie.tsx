import withStyles from "@material-ui/core/styles/withStyles";
import { styles } from "./styles";
import * as React from "react";
import { Component, ReactNode } from "react";
import { ITreeViewProps } from "./ITreeViewProps";
import { ITreeItem } from "../tree";
import { TreeLine } from "./tree-line";
import { Scrollbar } from "../scrollbar";

export const TreeView = withStyles(styles)(
    class extends Component<ITreeViewProps> {
        render(): ReactNode {
            return (
                <>
                    <div className={this.props.classes.overlay} onClick={this.props.onCloseTree} />
                    <div className={this.props.classes.tree}>
                        <Scrollbar>
                            {this.getList()}
                        </Scrollbar>
                    </div>
                </>
            );
        }

        private getList(): ReactNode {
            return (
                this.props.data.map((item: ITreeItem) => {
                    if (!item.parent) {
                        return (
                            <TreeLine
                                item={item}
                                list={this.props.data}
                                onChangeActive={this.props.onChangeActive}
                                key={item.id}
                            />
                        );
                    }
                    return <></>;
                })
            );
        }
    }
);
