import { ITreeItem } from "../../components/tree";
import { ComponentType } from "react";

export interface IMenuItem {
    id: string;
    title: string;
    isActive: boolean;
    options?: IMenuItem[];
    tree?: ITreeItem[];
    icon?: ComponentType<any>;
    onClick?(): void;
}
