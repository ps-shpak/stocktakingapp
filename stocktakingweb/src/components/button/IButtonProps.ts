import { PropTypes, WithStyles } from "@material-ui/core";
import { styles } from "./styles";
import * as React from "react";
import { ButtonProps } from "@material-ui/core/Button";
import { TButtonVariant } from "./TButtonVariant";
import { TButtonSize } from "./TButtonSize";

export interface IButtonProps extends WithStyles<typeof styles> {
    title: string;
    isDisable: boolean;
    className?: string;
    component?: React.ElementType<ButtonProps>;
    isFullWidth?: boolean;
    variant?: TButtonVariant;
    size?: TButtonSize;
    color?: PropTypes.Color;

    onClick(): void;
}
