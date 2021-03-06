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
        background: EColors.GREEN,
        color: "#000"
    },
    content: {
        display: "flex",
        width: "100%"
    },
    tooltip: {
        fontSize: 14
    }
});
