import createStyles from "@material-ui/core/styles/createStyles";
import { EColors } from "../../../config";

export const styles = createStyles({
    listItem: {
        "display": "flex",
        "width": "100%",
        "padding": "10px 20px",
        "borderBottom": `1px solid ${EColors.SIDEBAR}`,
        "boxSizing": "border-box",
        "fontSize": 20,
        "position": "relative",
        "zIndex": 1,
        "&:first-child": {
            borderTop: `1px solid ${EColors.SIDEBAR}`,
        }
    },
    title: {
        overflow: "hidden",
        textOverflow: "ellipsis",
        flexGrow: 3,
        paddingRight: 10
    },
    index: {
        marginRight: 10
    },
    right: {
        display: "flex",
        position: "relative",
        zIndex: 5,
    },
    button: {
        "marginRight": 20,
        "cursor": "pointer",
        "textDecoration": "underline",
        "&:hover": {
            textDecoration: "none"
        }
    }
});
