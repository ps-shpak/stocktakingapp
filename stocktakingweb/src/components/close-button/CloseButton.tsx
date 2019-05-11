import * as React from "react";
import { Component, ReactNode } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { styles } from "./styles";
import { ICloseButtonProps } from "./ICloseButtonProps";
import { Close } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";

export const CloseButton = withStyles(styles)(
    class extends Component<ICloseButtonProps> {
        render(): ReactNode {
            return (
                <IconButton
                    aria-label="Close"
                    className={this.props.classes.close}
                    onClick={this.props.onClick}
                >
                    <Close />
                </IconButton>
            );
        }
    }
);
