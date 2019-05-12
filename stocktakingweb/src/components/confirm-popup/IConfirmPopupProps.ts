import { IPopupProps } from "../popup";
import { WithStyles } from "@material-ui/core";
import { styles } from "./styles";

export interface IConfirmPopupProps extends IPopupProps, WithStyles<typeof styles> {
    onSubmit(): void;
}
