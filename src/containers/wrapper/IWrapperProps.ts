import { WithStyles } from "@material-ui/core";
import { styles } from "./styles";

export interface IWrapperProps extends WithStyles<typeof styles> {
    title?: string;
}
