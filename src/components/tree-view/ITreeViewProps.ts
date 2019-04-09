import { WithStyles } from "@material-ui/core";
import { styles } from "./styles";
import { ITreeItem } from "../tree";

export interface ITreeViewProps extends WithStyles<typeof styles> {
    data: ITreeItem[];

    onChangeActive(id: string): void;
}
