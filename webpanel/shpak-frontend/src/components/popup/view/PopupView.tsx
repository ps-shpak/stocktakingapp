import withStyles from "@material-ui/core/styles/withStyles";
import { styles } from "./styles";
import * as React from "react";
import { Component } from "react";
import { IPopupProps } from "./IPopupProps";

export const PopupView = withStyles(styles)(
    class extends Component<IPopupProps> {
        render(): React.ReactNode {
            return (
                <div className={this.props.classes.overlay}>
                    <div className={this.props.classes.popup}>
                        <div className={this.props.classes.header}>
                            <div className={this.props.classes.title}>{this.props.title}</div>
                            <div className={this.props.classes.icon}>&#10006;</div>
                        </div>
                        <div className={this.props.classes.content}>{this.props.children}</div>
                    </div>
                </div>
            );
        }
    }
);
