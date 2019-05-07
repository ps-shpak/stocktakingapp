import createStyles from "@material-ui/core/styles/createStyles";
import { EColors } from "../../../config";

export  const styles = createStyles({
    field: {
        display: "flex",
        width: "100%",
        marginBottom: 20
    },
    input: {
        display: "flex",
        padding: "10px 20px",
        border: `1px solid ${EColors.SIDEBAR}`,
        width: "100%",
        fontSize: 16
    }
});
