import { WithStyles } from "@material-ui/core";
import { styles } from "./styles";

export interface IAddUserFormProps extends WithStyles<typeof styles> {
    isVisible: boolean;

    onOpen(): void;

    onClose(): void;
}
