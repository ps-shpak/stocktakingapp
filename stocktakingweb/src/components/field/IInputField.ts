import { EFormTypes } from "../../config";

export interface IInputField {
    id: string;
    type: EFormTypes;
    value: string;
    isValid: boolean;
    isError: boolean;
}
