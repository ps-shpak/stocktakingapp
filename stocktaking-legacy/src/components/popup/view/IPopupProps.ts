import { WithStyles } from "@material-ui/core";
import { styles } from "./styles";

export interface IPopupProps extends WithStyles<typeof styles> {
    title: string;
    description?: string;
    className?: string;
}
