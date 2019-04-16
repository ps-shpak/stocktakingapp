import { IMenuItem } from "./IMenuItem";
import { IPosition } from "../../interfaces";

export interface IMenuProps {
    data: IMenuItem[];

    onChangeActive(rowIndex: number, subRowIndex: number): void;

    onOpenOptions(index: number): void;

    onChangePosition(position: IPosition): void;
}
