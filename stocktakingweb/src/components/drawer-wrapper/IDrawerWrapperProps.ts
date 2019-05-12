import { WithStyles } from "@material-ui/core";
import { styles } from "./styles";

export interface IDrawerWrapperProps extends WithStyles<typeof styles> {
    isVisible: boolean;
    title: string;
    buttonTitle: string;
    isButtonDisable: boolean;

    onClose(): void;

    onOpen(): void;

    onSubmit(): void;
}
