import { styles } from "./styles";
import { WithStyles } from "@material-ui/core/styles/withStyles";
import { EFormTypes } from "../../../config";
import { ChangeEvent } from "react";

export interface IInpitFieldViewProps extends WithStyles<typeof styles> {
    type: EFormTypes;
    placeholder: string;
    isReadonly: boolean;
    isRequired: boolean;
    value: string;
    maxLength?: number;
    className?: string;
    autoFocus?: boolean;
    isError?: boolean;
    isTextArea?: boolean;

    onChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void;
}
