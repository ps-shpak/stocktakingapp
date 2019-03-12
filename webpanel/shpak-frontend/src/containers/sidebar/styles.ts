import createStyles from "@material-ui/core/styles/createStyles";
import { EColors } from "../../config";

export const styles = createStyles({
   sidebar: {
       width: 300,
       height: "100vh",
       background: EColors.SIDEBAR,
       padding: "20px 0",
       display: "flex",
       flexDirection: "column",
       alignItems: "center",
       boxSizing: "border-box"
   },
    sidebarItem: {
       marginBottom: 10
    }
});
