export interface IMenuItem {
    title: string;
    isActive: boolean;
    options?: IMenuItem[];
}
