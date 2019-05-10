import withStyles from "@material-ui/core/styles/withStyles";
import { styles } from "./styles";
import * as React from "react";
import { Component, ReactNode } from "react";
import { IUserLayoutProps } from "./IUserLayoutProps";
import { Add } from "@material-ui/icons";
import { Fab } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";

export const UserLayout = withStyles(styles)(
    class extends Component<IUserLayoutProps> {
        render(): ReactNode {
            return (
                <div className={this.props.classes.userLayout}>
                    <div className={this.props.classes.header}>
                        <Tooltip title={"Добавить пользователя"} className={this.props.classes.tooltip}>
                            <Fab color="primary" aria-label="Add" onClick={this.props.onAddUser}>
                                <Add />
                            </Fab>
                        </Tooltip>
                    </div>
                    <div className={this.props.classes.content}>
                        {this.props.children}
                    </div>
                </div>
            );
        }
    }
);
