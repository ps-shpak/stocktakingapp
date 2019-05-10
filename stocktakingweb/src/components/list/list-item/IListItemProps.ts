import { WithStyles } from "@material-ui/core";
import { styles } from "./styles";
import { IListItem } from "../IListItem";

export interface IListItemProps extends WithStyles<typeof styles> {
    data: IListItem;
    index: number;

    onEditItem(index: number): void;

    onDeleteItem(index: number): void;
}
