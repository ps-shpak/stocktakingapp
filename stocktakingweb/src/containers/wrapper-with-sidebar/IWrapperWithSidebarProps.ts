export interface IWrapperWithSidebarProps {
    title: string;

    onOpenOptions?(index: number): void;

    onChangeActive?(rowIndex: number, subRowIndex: number): void;
}
