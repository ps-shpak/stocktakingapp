import { ITreeItem } from "./ITreeItem";

export interface ITreeProps {
    data: ITreeItem[];

    onChangeActive(item: ITreeItem): void;
}
