import { WithStyles } from "@material-ui/core";
import { styles } from "./styles";
import { IGetUserData } from "../../../services";

export interface IListItemProps extends WithStyles<typeof styles> {
    data: IGetUserData;
    index: number;

    onEditItem(id: string): void;

    onDeleteItem(id: string): void;
}
