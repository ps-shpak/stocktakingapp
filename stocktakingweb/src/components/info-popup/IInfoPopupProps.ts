import { styles } from "./styles";
import { IPopupProps } from "../popup";
import { WithStyles } from "@material-ui/core";

export interface IInfoPopupProps extends IPopupProps, WithStyles<typeof styles> {

}
