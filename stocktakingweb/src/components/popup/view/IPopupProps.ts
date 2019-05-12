import { WithStyles } from "@material-ui/core";
import { styles } from "./styles";

export interface IPopupProps extends WithStyles<typeof styles> {
    title: string;
    isVisible: boolean;
    description?: string;
    className?: string;

    onClose(): void;
}
