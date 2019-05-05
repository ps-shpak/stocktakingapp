import { WithStyles } from "@material-ui/core";
import { styles } from "./styles";

export interface IUserLayoutProps extends WithStyles<typeof styles> {
    onAddUser(): void;
}
