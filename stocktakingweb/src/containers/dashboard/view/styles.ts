import createStyles from "@material-ui/core/styles/createStyles";
import { EColors } from "../../../config";

export const styles = createStyles({
    dashboard: {
        position: "relative"
    },
    header: {
        display: "flex",
        padding: "40px 60px"
    },
    addButton: {
        background: EColors.GREEN,
        display: "flex",
    }
});
