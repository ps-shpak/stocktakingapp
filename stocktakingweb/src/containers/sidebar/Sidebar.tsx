import withStyles from "@material-ui/core/styles/withStyles";
import { styles } from "./styles";
import * as React from "react";
import { Component, ReactNode } from "react";
import { ISidebarProps } from "./ISidebarProps";
import { Avatar } from "../../components/avatar";
import { Divider } from "@material-ui/core";
import { SidebarStore } from "./SidebarStore";
import { Menu } from "../menu";
import { observer } from "mobx-react";

export const Sidebar = withStyles(styles)(
    observer(
        class extends Component<ISidebarProps> {
            private readonly store = new SidebarStore();

            componentDidMount(): void {
                this.store.onMount();
            }

            render(): ReactNode {
                return (
                    <div className={this.props.classes.sidebar}>
                        <Avatar name={"Maxim"} className={this.props.classes.sidebarItem} />
                        <Divider className={this.props.classes.divider} />
                        <Menu menuList={this.store.menuData} onOpen={this.store.onOpenSubMenu} />
                    </div>
                );
            }
        }
    )
);
