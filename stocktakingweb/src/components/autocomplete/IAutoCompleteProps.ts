import { IGetUserData } from "../../services";

export interface IAutoCompleteProps {
    list: IGetUserData[];
    placeholder: string;
}
