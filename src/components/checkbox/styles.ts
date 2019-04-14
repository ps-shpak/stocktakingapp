import createStyles from "@material-ui/core/styles/createStyles";
import { EColors } from "../../config";

export  const styles = createStyles({
    checkbox: {
        "display": "block",
        "position": "relative",
        "cursor": "pointer",
        "fontSize": 22,
        "width": 20,
        "height": 20,
        "border": `2px solid ${EColors.SIDEBAR_TEXT}`,
        "-webkit-user-select": "none",
        "-moz-user-select": "none",
        "-ms-user-select": "none",
        "userSelect": "none",
        "& $input": {
            "&:checked": {
                "& ~$checkmark": {
                    "&:after": {
                        display: "block",
                    }
                }
            }
        },
        "& $checkmark": {
            "&:after": {
                "left": 6,
                "top": 2,
                "width": 5,
                "height": 10,
                "border": "solid BLACK",
                "borderWidth": "0 2px 2px 0",
                "-webkit-transform": "rotate(45deg)",
                "-ms-transform": "rotate(45deg)",
                "transform": "rotate(45deg)",
            }
        }
    },
    input: {
        position: "absolute",
        opacity: 0,
        cursor: "pointer",
        margin: "0 !important",
    },
    checkmark: {
        "color": "#000",
        "height": 17,
        "width": 17,
        "backgroundColor": "#fff",
        "zIndex": 2,
        "&:after": {
            content: "''",
            position: "absolute",
            display: "none"
        }
    },
    wrapper: {
        position: "relative"
    }
});
