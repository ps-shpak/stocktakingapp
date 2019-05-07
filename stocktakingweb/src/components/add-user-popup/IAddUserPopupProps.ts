import { WithStyles } from "@material-ui/core";
import { styles } from "./styles";

export interface IAddUserPopupProps extends WithStyles<typeof styles> {
    isVisible: boolean;

    onChange?(list: string[]): void;

    onClose(): void;
}
