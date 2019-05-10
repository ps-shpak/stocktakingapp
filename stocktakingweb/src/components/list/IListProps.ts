import { WithStyles } from "@material-ui/core";
import { styles } from "./styles";
import { IListItem } from "./IListItem";

export interface IListProps extends WithStyles<typeof styles> {
    list: IListItem[];
    emptyListMessage: string;

    onDeleteItem(index: number): void;

    onEditItem(index: number): void;
}