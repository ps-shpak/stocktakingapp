import { WithStyles } from "@material-ui/core";
import { styles } from "./styles";
import { IMenuItem } from "../../../pages/main";

export interface IMenuViewProps extends WithStyles<typeof styles> {
    menuList: IMenuItem[];

    openOptions(index: number): void;

    changeActive(rowIndex: number, subRowIndex: number): void;
}
