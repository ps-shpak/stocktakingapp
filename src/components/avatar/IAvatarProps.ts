import { WithStyles } from "@material-ui/core";
import { styles } from "./styles";

export interface IAvatarProps extends WithStyles<typeof styles> {
    src?: string;
    name: string;
    className?: string;
}
