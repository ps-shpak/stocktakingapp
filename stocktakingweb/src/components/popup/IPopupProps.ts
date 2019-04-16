export interface IPopupProps {
    title: string;
    description?: string;
    isVisible: boolean;

    onClose(): void;
}
