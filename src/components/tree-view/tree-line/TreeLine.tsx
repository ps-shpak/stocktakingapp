import withStyles from "@material-ui/core/styles/withStyles";
import { styles } from "./styles";
import * as React from "react";
import { Component, ReactNode } from "react";
import { ITreeLineProps } from "./ITreeLineProps";
import cn from "classnames";
import { ITreeItem } from "../../tree";
import { observer } from "mobx-react";
import { TreeLineStore } from "./TreeLineStore";

export const TreeLine = withStyles(styles)(
    observer(
        class extends Component<ITreeLineProps> {
            private readonly store = new TreeLineStore();

            render(): ReactNode {
                const data = this.props.item;
                const arrowClassName = cn(this.props.classes.arrow, this.store.isOpened && this.props.classes.opened);
                return (
                    <div className={this.props.classes.line}>
                        <div className={this.props.classes.inner}>
                            {data.children && <div className={arrowClassName} onClick={this.store.onSwitchVisibilityChildren} />}
                            <input
                                type="checkbox"
                                className={this.props.classes.checkbox}
                                onChange={this.onChangeCheckbox}
                                checked={data.isActive}
                            />
                            <div className={this.props.classes.title}>{data.title}</div>
                        </div>
                        {this.store.isOpened &&
                            <div className={this.props.classes.children}>
                                {this.renderChildren()}
                            </div>
                        }
                    </div>
                );
            }

            private readonly onChangeCheckbox = (): void => {
                const id = this.props.item.id;
                this.props.onChangeActive(id);
            }

            private renderChildren(): ReactNode {
                if (!this.props.item.children) {
                    return <></>;
                }
                const children = this.getChildren();
                return children.map((child: ITreeItem) => {
                    return (
                        <TreeLine
                            item={child}
                            list={this.props.list}
                            onChangeActive={this.props.onChangeActive}
                            onOpen={this.props.onOpen}
                            key={child.id}
                        />
                    );
                });
            }

            private getChildren(): ITreeItem[] {
                const parentId = this.props.item.id;
                const children: ITreeItem[] = [];
                this.props.list.map((item: ITreeItem) => {
                   if (parentId === item.parent) {
                       children.push(item);
                   }
                });
                return children;
            }
        }
    )
);
