import { WithStyles } from "@material-ui/core";
import { styles } from "./styles";

export interface ILogoProps extends WithStyles<typeof styles> {
    title?: string;
    className?: string;
}
