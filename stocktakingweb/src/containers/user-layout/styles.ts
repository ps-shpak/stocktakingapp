import createStyles from "@material-ui/core/styles/createStyles";
import { EColors } from "../../config";

export const styles = createStyles({
    userLayout: {
        display: "flex",
        width: "100%",
        flexDirection: "column",
        position: "relative"
    },
    header: {
        display: "flex",
        padding: 20
    },
    button: {
        background: EColors.SIDEBAR_ITEM_BACKGROUND,
        color: EColors.SIDEBAR_TEXT
    },
    content: {
        display: "flex",
        width: "100%"
    }
});
