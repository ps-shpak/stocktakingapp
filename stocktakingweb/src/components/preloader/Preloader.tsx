import * as React from "react";
import { Component, ReactNode } from "react";
import { styles } from "./styles";
import withStyles from "@material-ui/core/styles/withStyles";
import { IPreloaderProps } from "./IPreloaderProps";
import { CircularProgress } from "@material-ui/core";

export const Preloader = withStyles(styles)(
    class extends Component<IPreloaderProps> {
        render(): ReactNode {
            return (
                <div className={this.props.classes.wrapper} >
                    <CircularProgress className={this.props.classes.preloader} />
                </div>
            );
        }
    }
);
