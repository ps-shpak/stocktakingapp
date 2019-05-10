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
import { IconButton } from "@material-ui/core";
import { Close } from "@material-ui/icons";

export const PopupView = withStyles(styles)(
    class extends Component<IPopupProps> {
        render(): ReactNode {
            const className = cn(this.props.classes.popup, this.props.className);
            return (
                <Dialog open={this.props.isVisible} onClose={this.props.onClose}>
                    <div className={className}>
                        <DialogTitle className={this.props.classes.title}>
                            {this.props.title}
                            <IconButton
                                aria-label="Close"
                                className={this.props.classes.close}
                                onClick={this.props.onClose}
                            >
                                <Close />
                            </IconButton>
                        </DialogTitle>
                        <DialogContent className={this.props.classes.content}>
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
