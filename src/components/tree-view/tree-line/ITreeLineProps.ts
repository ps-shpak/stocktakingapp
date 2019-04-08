import { WithStyles } from "@material-ui/core";
import { styles } from "./styles";
import { ITreeItem } from "../../tree";

export interface ITreeLineProps extends WithStyles<typeof styles> {
    data: ITreeItem;

    onChangeActive(item: ITreeItem): void;
}
