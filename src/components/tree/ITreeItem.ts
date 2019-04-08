export interface ITreeItem {
    id: string;
    isActive: boolean;
    title: string;
    options?: ITreeItem[];
}
