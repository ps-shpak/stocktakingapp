import { DashboardStore } from "./DashboardStore";

export interface IDashboardProps {
    store: DashboardStore;

    onCloseTree(): void;
}
