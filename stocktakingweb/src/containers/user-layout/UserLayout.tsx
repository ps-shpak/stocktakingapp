import withStyles from "@material-ui/core/styles/withStyles";
import { styles } from "./styles";
import * as React from "react";
import { Component, ReactNode } from "react";
import { IUserLayoutProps } from "./IUserLayoutProps";
import { Button } from "../../components/button";

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
                    </div>
                    <div className={this.props.classes.content}>
                        {this.props.children}
                    </div>
                </div>
            );
        }
    }
);
