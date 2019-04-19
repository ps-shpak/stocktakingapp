import { WithStyles } from "@material-ui/core";
import { styles } from "./styles";
import { ITreeItem } from "../../../components/tree";
import { IPosition } from "../../../interfaces";

export interface IDashboardViewProps extends WithStyles<typeof styles> {
    treeData: ITreeItem[];
    isTreeVisible: boolean;
    isPopupVisible: boolean;
    treePosition: IPosition;

    onClosePopup(): void;

    onChangeActiveTree(id: string): void;

    onCloseTree(): void;

    onOpenPopup(): void;
}
