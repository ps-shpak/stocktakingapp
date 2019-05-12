import { WithStyles } from "@material-ui/core";
import { styles } from "./styles";

export interface ICloseButtonProps extends WithStyles<typeof styles> {
    className?: string;

    onClick(): void;
}
