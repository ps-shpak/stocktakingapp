import { ITreeItem } from "../../components/tree";
import { IPosition } from "../../interfaces";

export interface IDashboardProps {
    tree: ITreeItem[];
    position: IPosition;
    isTreeVisible: boolean;

    onCloseTree(): void;
}
