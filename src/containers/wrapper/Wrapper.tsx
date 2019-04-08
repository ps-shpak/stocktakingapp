import withStyles from "@material-ui/core/styles/withStyles";
import { styles } from "./styles";
import * as React from "react";
import { Component, ReactNode } from "react";
import { IWrapperProps } from "./IWrapperProps";

export const Wrapper = withStyles(styles)(
    class extends Component<IWrapperProps> {
        render(): ReactNode {
            return (
                <div className={this.props.classes.wrapper}>
                    {this.props.children}
                </div>
            );
        }
    }
);
