export interface IPopupProps {
    title: string;
    description?: string;
    isVisible: boolean;
    className?: string;

    onClose(): void;
}
