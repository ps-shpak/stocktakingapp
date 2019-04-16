import { WithStyles } from "@material-ui/core";
import { styles } from "./styles";
import { IMenuItem } from "../IMenuItem";
import { SyntheticEvent } from "react";

export interface IMenuViewProps extends WithStyles<typeof styles> {
    menuList: IMenuItem[];

    openOptions(index: number): void;

    onClickMenuItem(event: SyntheticEvent<HTMLDivElement>, rowIndex: number, subrowIndex: number): void;
}
