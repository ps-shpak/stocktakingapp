import { WithStyles } from "@material-ui/core";
import { styles } from "./styles";

export interface ILayoutProps extends WithStyles<typeof styles> {
    isPreloaderVisible: boolean;
    buttonTitle: string;

    onClick(): void;
}
