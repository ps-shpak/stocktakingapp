import { WithStyles } from "@material-ui/core";
import { styles } from "./styles";
import { IMenuItem } from "./IMenuItem";

export interface IMenuProps extends WithStyles<typeof styles> {
    menuList: IMenuItem[];

    onOpen(index: number): void;
}
