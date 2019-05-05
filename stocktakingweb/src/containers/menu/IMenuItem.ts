import { ITreeItem } from "../../components/tree";

export interface IMenuItem {
    title: string;
    isActive: boolean;
    options?: IMenuItem[];
    tree?: ITreeItem[];
    path?: string;
    onClick?(): void;
}
