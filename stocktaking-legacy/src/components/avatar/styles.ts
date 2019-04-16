import createStyles from "@material-ui/core/styles/createStyles";
import { EColors } from "../../config";

export const styles = createStyles({
    avatar: {
        display: "flex",
        alignItems: "center",
        width: "100%",
        padding: "0 10px",
        boxSizing: "border-box"
    },
    avatarImage: {
        width: 64,
        height: 64,
        borderRadius: 8
    },
    name: {
        fontSize: 18,
        marginLeft: 20,
        color: EColors.SIDEBAR_TEXT
    }
});
