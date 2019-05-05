import withStyles from "@material-ui/core/styles/withStyles";
import { styles } from "./styles";
import * as React from "react";
import { Component, ReactNode } from "react";
import { IMenuViewProps } from "./IMenuViewProps";
import cn from "classnames";
import { IMenuItem } from "../IMenuItem";
import { attempt } from "lodash";

export const MenuView = withStyles(styles)(
    class extends Component<IMenuViewProps> {
        render(): ReactNode {
            return (
                <div className={this.props.classes.menu}>
                    {this.props.menuList.map((item: IMenuItem, rowIndex: number) => {
                        return (
                            <div className={this.props.classes.menuItem} key={rowIndex}>
                                <div
                                    className={this.getHeaderClassName(item.isActive)}
                                    onClick={() => this.onOpenOptions(rowIndex, item.onClick)}
                                >
                                    {item.title}
                                </div>
                                {item.isActive &&
                                    <div className={this.props.classes.options}>
                                        {item.options && item.options.map((option: IMenuItem, subRowIndex: number) => {
                                            return (
                                                <div
                                                    onClick={(e) => this.props.onClickMenuItem(e, rowIndex, subRowIndex)}
                                                    className={this.getMenuItemClassName(option.isActive)}
                                                    key={subRowIndex}
                                                >
                                                    {option.title}
                                                </div>
                                            );
                                        })}
                                    </div>
                                }
                            </div>
                        );
                    })}
                </div>
            );
        }

        private getMenuItemClassName(predicate: boolean): string {
            return cn(
                this.props.classes.optionItem,
                predicate && this.props.classes.activeOptionItem
            );
        }

        private getHeaderClassName(predicate: boolean): string {
            return cn(
                this.props.classes.header,
                predicate && this.props.classes.activeOptionItem
            );
        }

        private onOpenOptions(index: number, callback?: () => void): void {
            this.props.openOptions(index);
            attempt(callback!);
        }
    }
);
