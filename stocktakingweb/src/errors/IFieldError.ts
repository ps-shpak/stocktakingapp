import { EFormTypes } from "../config";

export interface IFieldError {
    type: EFormTypes;
    codes: number[];
}
