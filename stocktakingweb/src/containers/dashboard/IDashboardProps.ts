import { DashboardStore } from "./DashboardStore";
import { RouteComponentProps } from "react-router";

export interface IDashboardProps extends RouteComponentProps {
    store: DashboardStore;

    onCloseTree(): void;
}
