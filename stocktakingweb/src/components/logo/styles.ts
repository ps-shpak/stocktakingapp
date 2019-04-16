import createStyles from "@material-ui/core/styles/createStyles";
import { EColors } from "../../config";

export const styles = createStyles({
    logo: {
        fontSize: 18,
        color: EColors.SIDEBAR_TEXT,
        textDecoration: "none",
        width: "100%",
        padding: "0 10px",
        boxSizing: "border-box"
    },
});
