import withStyles from "@material-ui/core/styles/withStyles";
import { styles } from "./styles";
import * as React from "react";
import { Component, ReactNode } from "react";
import { IButtonProps } from "./IButtonProps";
import * as cn from "classnames";

export const Button = withStyles(styles)(
    class extends Component<IButtonProps> {
        render(): ReactNode {
            const className = cn(
                this.props.classes.button,
                this.props.isDisable && this.props.classes.disable
            );
            return (
                <div className={className} onClick={this.props.onClick}>
                    {this.props.title}
                </div>
            );
        }
    }
);
