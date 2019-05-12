import withStyles from "@material-ui/core/styles/withStyles";
import { styles } from "./styles";
import * as React from "react";
import { Component, ReactNode } from "react";
import { IMenuProps } from "./IMenuProps";
import { IMenuItem } from "./IMenuItem";
import { List } from "@material-ui/core";
import { MenuLine } from "../../components/menu-line/MenuLine";

export const Menu = withStyles(styles)(
    class extends Component<IMenuProps> {
        render(): ReactNode {
            return (
                <List className={this.props.classes.menu}>
                    {this.props.menuList.map((item: IMenuItem, index: number) => {
                        return (
                            <MenuLine
                                key={index}
                                line={item}
                                index={index}
                                onOpen={this.props.onOpen}
                            />
                        );
                    })}
                </List>
            );
        }

    }
);
