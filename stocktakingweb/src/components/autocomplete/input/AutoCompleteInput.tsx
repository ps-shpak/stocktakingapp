import * as React from "react";
import { Component, ReactNode } from "react";
import { styles } from "./styles";
import withStyles from "@material-ui/core/styles/withStyles";
import { IAutoCompleteInputProps } from "./IAutoCompleteInputProps";

export const AutoCompleteInput = withStyles(styles)(
    class extends Component<IAutoCompleteInputProps> {
        render(): ReactNode {
            return (
                <input {...this.props.props} className={this.props.classes.input} />
            );
        }
    }
);
