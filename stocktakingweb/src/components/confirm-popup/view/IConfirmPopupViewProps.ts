import { WithStyles } from "@material-ui/core";
import { styles } from "./styles";

export interface IConfirmPopupViewProps extends WithStyles<typeof styles> {
    title: string;
    description?: string;
    isVisible?: boolean;
    className?: string;

    onClose(): void;

    onSubmit(): void;
}
