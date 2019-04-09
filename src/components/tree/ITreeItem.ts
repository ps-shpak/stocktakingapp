export interface ITreeItem {
    id: string;
    isActive: boolean;
    title: string;
    parent?: string;
    children?: string[];
}
