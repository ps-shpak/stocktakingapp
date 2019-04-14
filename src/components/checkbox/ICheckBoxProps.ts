import { WithStyles } from "@material-ui/core/styles";
import { styles } from "./styles";

export interface ICheckBoxProps extends WithStyles<typeof styles> {
    isChecked: boolean;
    className?: string;

    onCheckboxChanged(): void;
}
