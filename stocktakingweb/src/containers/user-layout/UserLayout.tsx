import withStyles from "@material-ui/core/styles/withStyles";
import { styles } from "./styles";
import * as React from "react";
import { Component, ReactNode } from "react";
import { IUserLayoutProps } from "./IUserLayoutProps";
import { Button } from "../../components/button";
import { Add } from "@material-ui/icons";
import { Fab } from "@material-ui/core";

export const UserLayout = withStyles(styles)(
    class extends Component<IUserLayoutProps> {
        render(): ReactNode {
            return (
                <div className={this.props.classes.userLayout}>
                    <div className={this.props.classes.header}>
                        <Button
                            title={"Добавить пользователя"}
                            onClick={this.props.onAddUser}
                            isDisable={false}
                            className={this.props.classes.button}
                        />
                        <Fab color="primary" aria-label="Add" onClick={this.props.onAddUser}>
                            <Add />
                        </Fab>
                    </div>
                    <div className={this.props.classes.content}>
                        {this.props.children}
                    </div>
                </div>
            );
        }
    }
);
