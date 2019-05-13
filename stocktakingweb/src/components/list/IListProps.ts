import { WithStyles } from "@material-ui/core";
import { styles } from "./styles";
import { IGetUserData } from "../../services";

export interface IListProps extends WithStyles<typeof styles> {
    list: IGetUserData[];
    emptyListMessage: string;

    onDeleteItem(id: string): void;

    onEditItem(id: string): void;
}
