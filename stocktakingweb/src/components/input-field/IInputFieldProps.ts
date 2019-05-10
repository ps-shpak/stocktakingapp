import { IFieldProps } from "../field";
import { EFormTypes } from "../../config";

export interface IInputFieldProps extends IFieldProps {
    type: EFormTypes;
    placeholder: string;
    isReadonly?: boolean;
    isRequired?: boolean;
    value?: string;
    maxLength?: number;
    isTextArea?: boolean;
    autoFocus?: boolean;

    onChange(id: string, value: string): void;

    onBlur?(): void;
}
