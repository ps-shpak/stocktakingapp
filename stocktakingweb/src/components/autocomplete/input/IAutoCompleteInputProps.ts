import { styles } from "./styles";
import { WithStyles } from "@material-ui/core";
import { HTMLProps } from "react";

export interface IAutoCompleteInputProps extends WithStyles<typeof styles> {
    placeholder: string;

    props: HTMLProps<HTMLInputElement>;
}
