import { ITreeItem } from "../../components/tree";

export interface IDashboardProps {
    tree: ITreeItem[];
    isTreeVisible: boolean;

    onCloseTree(): void;
}
