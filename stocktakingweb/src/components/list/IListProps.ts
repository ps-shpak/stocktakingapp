import { WithStyles } from "@material-ui/core";
import { styles } from "./styles";
import { IGetUserData } from "../../services";

export interface IListProps extends WithStyles<typeof styles> {
    list: IGetUserData[];
    emptyListMessage: string;

    onDeleteItem(index: number): void;

    onEditItem(index: number): void;
}
