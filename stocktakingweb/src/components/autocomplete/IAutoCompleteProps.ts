import { IGetUserData } from "../../services";
import { IFieldProps } from "../field";
import { EFormTypes } from "../../config";

export interface IAutoCompleteProps extends IFieldProps {
    list: IGetUserData[];
    placeholder: string;
    value?: string;
    type: EFormTypes;

    onSelect(item: IGetUserData): void;
}
