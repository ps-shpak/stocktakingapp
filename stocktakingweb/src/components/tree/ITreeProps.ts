import { ITreeItem } from "./ITreeItem";

export interface ITreeProps {
    data: ITreeItem[];
    isVisible: boolean;

    onChangeActive(id: string): void;

    onCloseTree(): void;
}
