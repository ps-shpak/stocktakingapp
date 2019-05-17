import { IGetUserData } from "../../services";

export interface IAutoCompleteProps {
    list: IGetUserData[];
    placeholder: string;

    onSelect(item: IGetUserData): void;
}
