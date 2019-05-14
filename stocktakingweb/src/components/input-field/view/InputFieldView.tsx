import * as React from "react";
import { Component, ReactNode } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { styles } from "./styles";
import { IInpitFieldViewProps } from "./IInpitFieldViewProps";
import { TextField } from "@material-ui/core";
import { EInputFieldVariants } from "../EInputFieldVariants";
import * as cn from "classnames";

export const InputFieldView = withStyles(styles)(
    class extends Component<IInpitFieldViewProps> {
        render(): ReactNode {
            const className = cn(this.props.className, this.props.classes.field);
            return (
                <TextField
                    label={this.props.placeholder}
                    autoFocus={this.props.autoFocus}
                    error={this.props.isError}
                    fullWidth={true}
                    className={className}
                    multiline={this.props.isTextArea}
                    required={this.props.isRequired}
                    disabled={this.props.isReadonly}
                    variant={EInputFieldVariants.OUTLINED}
                    onChange={this.props.onChange}
                    defaultValue={this.props.value}
                />
            );
        }
    }
);
