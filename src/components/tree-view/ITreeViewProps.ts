import { WithStyles } from "@material-ui/core";
import { styles } from "./styles";
import { ITreeItem } from "../tree";
import { IPosition } from "../../interfaces";

export interface ITreeViewProps extends WithStyles<typeof styles> {
    data: ITreeItem[];
    position: IPosition;

    onCloseTree(): void;

    onChangeActive(id: string): void;
}
