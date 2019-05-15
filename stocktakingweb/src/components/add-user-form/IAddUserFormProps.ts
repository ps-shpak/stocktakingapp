import { IFieldProps } from "../field";
import { IGetUserData } from "../../services";

export interface IAddUserFormProps extends IFieldProps {
    isVisible: boolean;
    isFormValid: boolean;
    activeUser?: IGetUserData;
    buttonText: string;

    onOpen(): void;

    onClose(): void;

    onSubmit(): void;
}
