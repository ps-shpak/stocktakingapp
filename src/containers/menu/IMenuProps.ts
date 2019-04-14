import { IMenuItem } from "./IMenuItem";

export interface IMenuProps {
    data: IMenuItem[];

    onChangeActive(rowIndex: number, subRowIndex: number): void;

    onOpenOptions(index: number): void;
}
