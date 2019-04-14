import { ITreeItem } from "./ITreeItem";
import { IPosition } from "../../interfaces";

export interface ITreeProps {
    data: ITreeItem[];
    position: IPosition;
    isVisible: boolean;

    onChangeActive(id: string): void;
}
