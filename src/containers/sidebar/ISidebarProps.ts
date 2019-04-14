import { WithStyles } from "@material-ui/core";
import { styles } from "./styles";
import { IMenuItem } from "../menu/IMenuItem";

export interface ISidebarProps extends WithStyles<typeof styles> {
    data: IMenuItem[];

    onChangeActive(rowIndex: number, subRowIndex: number): void;

    onOpenOptions(index: number): void;
}
