import { WithStyles } from "@material-ui/core";
import { styles } from "./styles";

export interface IButtonProps extends WithStyles<typeof styles> {
    title: string;
    isDisable: boolean;
    className?: string;

    onClick(): void;
}
