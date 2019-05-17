import { IPopupProps } from "../popup";

export interface IConfirmPopupProps extends IPopupProps {
    onSubmit(): void;
}
