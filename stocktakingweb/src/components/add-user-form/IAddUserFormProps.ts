import { IFieldProps } from "../field";

export interface IAddUserFormProps extends IFieldProps {
    isVisible: boolean;
    isFormValid: boolean;

    onOpen(): void;

    onClose(): void;

    onSubmit(): void;
}
