import { EFormTypes } from "../../config";

export interface IInputField {
    id: string;
    type: EFormTypes;
    placeholder: string;
    value: string;
    isValid: boolean;
    isError: boolean;
}
