import withStyles from "@material-ui/core/styles/withStyles";
import { styles } from "./styles";
import * as React from "react";
import { Component, ReactNode } from "react";
import { ITreeViewProps } from "./ITreeViewProps";
import { ITreeItem } from "../tree";
import { TreeLine } from "./tree-line";
import { Scrollbar } from "../scrollbar";
import { autorun } from "mobx";

interface ITreeViewState {
    waitingData: boolean;
}

export const TreeView = withStyles(styles)(
    class extends Component<ITreeViewProps, ITreeViewState> {
        constructor(props: ITreeViewProps) {
            super(props);
            this.state = {
                waitingData: true,
            };
        }

        componentDidMount() {
            autorun(() => {
                this.setState({
                    waitingData: (this.props.data.length === 0),
                });
            });
        }

        render(): ReactNode {
            return (
                <>
                    <div className={this.props.classes.tree}>
                        <Scrollbar>
                            {this.getList()}
                        </Scrollbar>
                    </div>
                </>
            );
        }

        private getList(): ReactNode {
            console.log("getList - this.state.waitingData=", this.state.waitingData);
            if (this.state.waitingData) {
                return <></>;
            }
            console.log("getList - this.props.data", JSON.stringify(this.props.data, undefined, 2));
            return (
                this.props.data.map((item: ITreeItem) => {
                    if (!item.parent) {
                        return (
                            <TreeLine
                                list={this.props.data}
                                item={item}
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
