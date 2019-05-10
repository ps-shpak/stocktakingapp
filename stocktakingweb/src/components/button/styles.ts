import createStyles from "@material-ui/core/styles/createStyles";
import { EColors } from "../../config";

export const styles = createStyles({
   button: {
       padding: "10px 20px",
       border: `1px solid ${EColors.SIDEBAR}`,
       fontSize: 16,
       color: EColors.SIDEBAR,
       cursor: "pointer"
   },
    disable: {
        background: "rgba(0, 0, 0, 0.3) !important",
        pointerEvents: "none"
    }
});
