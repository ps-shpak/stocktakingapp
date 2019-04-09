import { ITreeItem } from "./ITreeItem";

export interface ITreeProps {
    data: ITreeItem[];

    onChangeActive(id: string): void;

    onOpen(id: string): void;
}
