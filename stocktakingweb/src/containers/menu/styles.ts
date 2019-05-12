import createStyles from "@material-ui/core/styles/createStyles";
import { EColors } from "../../config";

export const styles = createStyles({
   menu: {
        width: "100%"
   },
    menuItem: {
        cursor: "pointer"
    },
    header: {
        color: EColors.SIDEBAR_TEXT,
        padding: "5px 10px",
        fontSize: 18
    },
    options: {

    },
    optionItem: {
        color: EColors.SIDEBAR_TEXT,
        padding: "5px 0 5px 20px",
        fontSize: 16
    },
    activeOptionItem: {
       background: EColors.SIDEBAR_ITEM_BACKGROUND
    }
});
