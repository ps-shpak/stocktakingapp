import withStyles from "@material-ui/core/styles/withStyles";
import { styles } from "./styles";
import * as React from "react";
import { Component, ReactNode } from "react";
import { IMenuViewProps } from "./IMenuViewProps";
import { IMenuItem } from "../../../pages/main";
import * as cn from "classnames";

export const MenuView = withStyles(styles)(
    class extends Component<IMenuViewProps> {
        render(): ReactNode {
            return (
                <div className={this.props.classes.menu}>
                    {this.props.menuList.map((item: IMenuItem, rowIndex: number) => {
                        return (
                            <div className={this.props.classes.menuItem} key={rowIndex}>
                                <div
                                    className={this.props.classes.header}
                                    onClick={() => this.props.openOptions(rowIndex)}
                                >
                                    {item.title}
                                </div>
                                {item.isActive &&
                                    <div className={this.props.classes.options}>
                                        {item.options && item.options.map((option: IMenuItem, subRowIndex: number) => {
                                            return (
                                                <div
                                                    onClick={() => this.props.changeActive(rowIndex, subRowIndex)}
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

        private getMenuItemClassName(prediacate: boolean): string {
            return cn(
                this.props.classes.optionItem,
                prediacate && this.props.classes.activeOptionItem
            );
        }
    }
);
