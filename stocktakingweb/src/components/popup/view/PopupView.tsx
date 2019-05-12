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
import { CloseButton } from "../../close-button";

export const PopupView = withStyles(styles)(
    class extends Component<IPopupProps> {
        render(): ReactNode {
            const className = cn(this.props.classes.popup, this.props.className);
            return (
                <Dialog open={this.props.isVisible} onClose={this.props.onClose}>
                    <div className={className}>
                        <DialogTitle className={this.props.classes.title}>
                            <div className={this.props.classes.titleInner}>
                                {this.props.title}
                                <CloseButton onClick={this.props.onClose} />
                            </div>
                        </DialogTitle>
                        <DialogContent className={this.props.classes.content}>
                            {this.props.description &&
                                <DialogContentText className={this.props.classes.contentText}>
                                    {this.props.description}
                                </DialogContentText>
                            }
                            <div className={this.props.classes.children}>
                                {this.props.children}
                            </div>
                        </DialogContent>
                    </div>
                </Dialog>
            );
        }
    }
);
