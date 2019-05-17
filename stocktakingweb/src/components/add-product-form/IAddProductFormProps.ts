import { IFieldProps } from "../field";
import { IGetUserData } from "../../services";

export interface IAddProductFormProps extends IFieldProps {
    isVisible: boolean;
    buttonTitle: string;
    isFormValid: boolean;
    userList: IGetUserData[];

    onSelectUser(user: IGetUserData): void;

    onOpen(): void;

    onClose(): void;

    onSubmit(): void;
}
