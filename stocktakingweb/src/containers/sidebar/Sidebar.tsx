import withStyles from "@material-ui/core/styles/withStyles";
import { styles } from "./styles";
import * as React from "react";
import { Component, ReactNode } from "react";
import { ISidebarProps } from "./ISidebarProps";
import { Logo } from "../../components/logo";
import { Avatar } from "../../components/avatar";
import { List } from "@material-ui/core";

export const Sidebar = withStyles(styles)(
    class extends Component<ISidebarProps> {

        render(): ReactNode {
           return (
               <List className={this.props.classes.sidebar}>
                   <Logo className={this.props.classes.sidebarItem} />
                   <Avatar name={"Maxim"} className={this.props.classes.sidebarItem} />
               </List>
           );
       }
    }
);
