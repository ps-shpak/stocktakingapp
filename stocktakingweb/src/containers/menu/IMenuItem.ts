import { ITreeItem } from "../../components/tree";
import { ComponentType } from "react";

export interface IMenuItem {
    title: string;
    isActive: boolean;
    options?: IMenuItem[];
    tree?: ITreeItem[];
    path?: string;
    icon?: ComponentType<any>;
    onClick?(): void;
}
