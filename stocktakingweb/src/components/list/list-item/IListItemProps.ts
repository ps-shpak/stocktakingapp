import { WithStyles } from "@material-ui/core";
import { styles } from "./styles";
import { IGetUserData } from "../../../services";

export interface IListItemProps extends WithStyles<typeof styles> {
    data: IGetUserData;
    index: number;

    onEditItem(index: number): void;

    onDeleteItem(index: number): void;
}
