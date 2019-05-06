import { WithStyles } from "@material-ui/core";
import { styles } from "./styles";
import { Owner } from "../Owner";
import { AddProductPopupState } from "./AddProductPopupState";

export interface IAddProductPopupViewProps extends WithStyles<typeof styles> {
    getAvailableOwners(): Owner[];
    fetchAvailableOwners(): Promise<void>;
    onSubmit(state: AddProductPopupState): void;
}
