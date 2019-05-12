import withStyles from "@material-ui/core/styles/withStyles";
import { styles } from "./styles";
import * as React from "react";
import { Component, ReactNode } from "react";
import { IButtonProps } from "./IButtonProps";
import { Button as ButtonMaterial } from "@material-ui/core";
import { EButtonVariant } from "./EButtonVariant";
import { EButtonSize } from "./EButtonSize";
import { EButtonColors } from "./EButtonColors";

export const Button = withStyles(styles)(
    class extends Component<IButtonProps> {
        render(): ReactNode {
            return (
                <ButtonMaterial
                    disabled={this.props.isDisable}
                    fullWidth={this.props.isFullWidth}
                    onClick={this.props.onClick}
                    className={this.props.className}
                    component={this.props.component}
                    color={this.props.color || EButtonColors.PRIMARY}
                    variant={this.props.variant || EButtonVariant.CONTAINED}
                    size={this.props.size || EButtonSize.LARGE}
                >
                    {this.props.title}
                </ButtonMaterial>
            );
        }
    }
);
