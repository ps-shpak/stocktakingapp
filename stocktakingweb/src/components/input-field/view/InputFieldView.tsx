import * as React from "react";
import { Component, ReactNode } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { styles } from "./styles";
import { IInpitFieldViewProps } from "./IInpitFieldViewProps";
import * as cn from "classnames";

export const InputFieldView = withStyles(styles)(
    class extends Component<IInpitFieldViewProps> {
        render(): ReactNode {
            const wrapperClassName = cn(this.props.classes.field, this.props.className);
            return (
                <div className={wrapperClassName}>
                    <input
                        placeholder={this.props.placeholder}
                        maxLength={this.props.maxLength}
                        required={this.props.isRequired}
                        readOnly={this.props.isReadonly}
                        value={this.props.value}
                        onChange={this.props.onChange}
                        className={this.props.classes.input}
                    />
                </div>
            );
        }
    }
);
