import { ITreeItem } from "../../components/tree";

export interface IMenuItem {
    title: string;
    isActive: boolean;
    options?: IMenuItem[];
    tree?: ITreeItem[];
    onClick?(): void;
}
