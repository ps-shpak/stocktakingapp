import withStyles from "@material-ui/core/styles/withStyles";
import { styles } from "./styles";
import * as React from "react";
import { Component, ReactNode } from "react";
import { IPopupProps } from "./IPopupProps";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Dialog from "@material-ui/core/Dialog";
import * as cn from "classnames";

export const PopupView = withStyles(styles)(
    class extends Component<IPopupProps> {
        render(): ReactNode {
            const className = cn(this.props.classes.popup, this.props.className);
            return (
                <Dialog open={this.props.isVisible} onClose={this.props.onClose}>
                    <div className={className}>
                        <DialogTitle>{this.props.title}</DialogTitle>
                        <DialogContent>
                            {this.props.description &&
                            <DialogContentText>
                                {this.props.description}
                            </DialogContentText>
                            }
                            {this.props.children}
                        </DialogContent>
                    </div>
                </Dialog>
            );
        }
    }
);
