import { WithStyles } from "@material-ui/core";
import { styles } from "./styles";
import { ITreeItem } from "../../../components/tree";
import { ReactNode } from "react";

export interface IDashboardViewProps extends WithStyles<typeof styles> {
    treeData: ITreeItem[];
    isTreeVisible: boolean;

    onChangeActiveTree(id: string): void;
    onCloseTree(): void;

    createAddProductPopup(): ReactNode;
    showAddProductPopup(): void;
}
