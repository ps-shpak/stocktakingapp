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
        "&:first-child": {
            borderTop: `1px solid ${EColors.SIDEBAR}`,
        }
    },
    title: {
        overflow: "hidden",
        textOverflow: "ellipsis",
        flexGrow: 3
    },
    index: {
        marginRight: 10
    },
    right: {
        display: "flex"
    },
    button: {
        "marginLeft": 20,
        "cursor": "pointer",
        "textDecoration": "underline",
        "&:hover": {
            textDecoration: "none"
        }
    }
});
