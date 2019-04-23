import { WithStyles } from "@material-ui/core";
import { styles } from "./styles";
import { ITreeItem } from "../../../components/tree";

export interface IDashboardViewProps extends WithStyles<typeof styles> {
    treeData: ITreeItem[];
    isTreeVisible: boolean;
    isPopupVisible: boolean;

    onClosePopup(): void;

    onChangeActiveTree(id: string): void;

    onCloseTree(): void;

    onOpenPopup(): void;
}
