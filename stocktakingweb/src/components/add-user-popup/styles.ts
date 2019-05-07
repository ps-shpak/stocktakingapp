import createStyles from "@material-ui/core/styles/createStyles";
import { EColors } from "../../config";

export const styles = createStyles({
    button: {
        "background": EColors.GREEN,
        "&:hover": {
            background: EColors.DARK_GREEN
        }
    }
});
