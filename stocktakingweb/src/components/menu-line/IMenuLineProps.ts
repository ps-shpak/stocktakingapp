import { IMenuItem } from "../../containers/menu";

export interface IMenuLineProps {
    line: IMenuItem;
    index: number;

    onOpen(index: number): void;
}
